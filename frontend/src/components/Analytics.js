import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Analytics.css';
import AnalyticsService from '../services/analytics.service';
import PrescriptionService from '../services/prescription.service';
import AuthService from '../services/auth.service';

const Analytics = () => {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Patient');
  const [data, setData] = useState({
    mainValue: 0,
    trend: [],
    list: [],
    label: 'Medication Adherence',
    listTitle: 'Prescription History'
  });
  const [loading, setLoading] = useState(false);
  const user = AuthService.getCurrentUser();



  const fetchTabData = useCallback((tab) => {
    setLoading(true);

    let promise;
    switch (tab) {
      case 'Patient':
        promise = Promise.all([
          AnalyticsService.getPatientHistory(user.id),
          PrescriptionService.getPatientPrescriptions()
        ]).then(([analyticsRes, prescriptionRes]) => {
          setData({
            mainValue: analyticsRes.data.currentAdherence,
            trend: analyticsRes.data.trend || [],
            list: prescriptionRes.data,
            label: 'Medication Adherence',
            listTitle: 'Prescription History'
          });
        });
        break;
      case 'Doctor':
        promise = AnalyticsService.getDoctorStats().then(res => {
          setData({
            mainValue: res.data.averageAdherence,
            trend: res.data.trend || [],
            list: [
              { label: 'Total Patients', value: res.data.totalPatients },
              { label: 'Total Prescriptions', value: res.data.totalPrescriptions }
            ],
            label: 'Average Patient Adherence',
            listTitle: 'Statistics'
          });
        });
        break;
      case 'Pharmacy':
        promise = AnalyticsService.getPharmacistOverview().then(res => {
          setData({
            mainValue: Math.round(res.data.totalInventoryValue),
            trend: [
              { name: 'W1', adherence: 40 },
              { name: 'W2', adherence: 60 },
              { name: 'W3', adherence: 55 },
              { name: 'W4', adherence: 75 }
            ],
            list: res.data.lowStockItems.map(item => ({
              medicationName: item.name,
              quantity: item.quantity
            })),
            label: 'Total Inventory Value ($)',
            listTitle: 'Low Stock Alerts'
          });
        });
        break;
      case 'Admin':
        promise = AnalyticsService.getAdminStats().then(res => {
          setData({
            mainValue: res.data.totalUsers,
            trend: [
              { name: 'W1', adherence: 30 },
              { name: 'W2', adherence: 50 },
              { name: 'W3', adherence: 70 },
              { name: 'W4', adherence: 90 }
            ],
            list: [
              { label: 'Total Drugs', value: res.data.totalDrugs },
              { label: 'Total Prescriptions', value: res.data.totalPrescriptions }
            ],
            label: 'Total System Users',
            listTitle: 'System Stats'
          });
        });
        break;
      default:
        setLoading(false);
        return;
    }

    promise
      .catch(err => console.error(`Error fetching ${tab} analytics`, err))
      .finally(() => setLoading(false));
  }, [user.id]);

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, fetchTabData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.trend) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = 120;

    const trendValues = data.trend.length > 0
      ? data.trend.map(i => i.adherence)
      : [0, 0, 0, 0];

    const max = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#3cff8f";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(60, 255, 143, 0.5)";

    ctx.beginPath();
    trendValues.forEach((value, index) => {
      const x = (index / (trendValues.length - 1)) * canvas.width;
      const y = canvas.height - (value / max) * canvas.height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.shadowBlur = 0;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(60, 255, 143, 0.2)");
    gradient.addColorStop(1, "rgba(60, 255, 143, 0)");

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [data.trend]);

  const tabs = ['Patient', 'Doctor', 'Pharmacy', 'Admin'];

  return (
    <div className="analytics-container">
      <div className="analytics-app">
        {/* Header */}
        <div className="header">
          <h2>Analytics</h2>
          <div className="tabs">
            {tabs.map(tab => (
              <span
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Data Card */}
        <div className="card">
          <h3>{activeTab} Overview</h3>
          <p className="sub">{data.label}</p>

          <div className="percentage">
            {/*<span>{data.mainValue}{activeTab === 'Pharmacy' ? '' : '%'}</span>*/}
            <span>
    {typeof data.mainValue === 'number' && activeTab !== 'Pharmacy' && activeTab !== 'Admin'
        ? data.mainValue.toFixed(2)
        : data.mainValue}
              {activeTab === 'Pharmacy' || activeTab === 'Admin' ? '' : '%'}
  </span>
            <small className="green">Last 30 Days +5%</small>
          </div>

          <canvas id="lineChart" ref={canvasRef}></canvas>

          <div className="weeks">
            {data.trend && data.trend.length > 0 ? data.trend.map((t, i) => (
              <span key={i}>{t.name}</span>
            )) : (
              <>
                <span>W1</span>
                <span>W2</span>
                <span>W3</span>
                <span>W4</span>
              </>
            )}
          </div>
        </div>

        {/* Dynamic List Card */}
        <div className="card">
          <h3>{data.listTitle}</h3>

          {loading ? (
            <p className="sub">Loading...</p>
          ) : (data.list && data.list.length > 0 ? (
            data.list.map((item, idx) => (
              <div className="list-item" key={idx}>
                <span className="icon">{activeTab === 'Pharmacy' ? '⚠️' : (activeTab === 'Patient' ? '💊' : '📊')}</span>
                <div>
                  <p>{item.medicationName || item.label || 'Unknown'}</p>
                  <small>{item.quantity !== undefined ? `Stock: ${item.quantity}` : (item.value !== undefined ? `Value: ${item.value}` : new Date().toLocaleDateString())}</small>
                </div>
              </div>
            ))
          ) : (
            <p className="sub">No data available.</p>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav-analytics">
          <span onClick={() => window.location.href = '/'}>🏠</span>
          <span className="active">📊</span>
          <span>📄</span>
          <span>👤</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
