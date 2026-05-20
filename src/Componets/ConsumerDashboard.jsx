import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  LayoutDashboard,
  Code2,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Activity,
  ShieldCheck,
  Moon,
  Sparkles,
  TrendingUp,
  Globe,
  Lock,
  RefreshCw,
  ChevronRight,
  Star,
  Bell,
  ArrowUpRight,
  Cpu,
  Layers,
  Shield,
  BarChart2,
  Wifi
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── Gemini palette tokens (Light) ─────────────────────────── */
const G = {
  surface: "#FFFFFF",
  surfaceAlt: "#F8F9FA",
  surfaceCard: "#FFFFFF",
  border: "rgba(0,0,0,0.08)",
  borderHover: "rgba(0,0,0,0.16)",
  blue: "#1A73E8",
  blueDeep: "#1558B0",
  teal: "#137333",
  amber: "#E37400",
  red: "#C5221F",
  purple: "#7B2FBE",
  pink: "#C2185B",
  textPrimary: "#202124",
  textSecondary: "#5F6368",
  textMuted: "#9AA0A6",
  gemGradient: "linear-gradient(135deg, #4285F4 0%, #9B59B6 50%, #E91E8C 100%)",
  blueGrad: "linear-gradient(135deg, #4285F4 0%, #34A0E6 100%)",
};

/* ─── Gemini Spinner ─────────────────────────────────────────── */
function GemSpinner({ size = 40 }) {
  return (
    <motion.div
      style={{ width: size, height: size, position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="1" />
            <stop offset="50%" stopColor="#9B59B6" stopOpacity="1" />
            <stop offset="100%" stopColor="#E91E8C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="16" stroke="rgba(0,0,0,0.08)" strokeWidth="3" fill="none" />
        <path d="M 20 4 A 16 16 0 1 1 4 20" stroke="url(#spinGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
}

/* ─── Animated Logo ──────────────────────────────────────────── */
function FlowraLogo() {
  return (
    <div style={{ padding: "28px 24px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      <motion.div
        animate={{
          rotate: [0, 15, -15, 8, -8, 0],
          scale: [1, 1.15, 0.95, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        style={{
          width: 36, height: 36,
          background: G.gemGradient,
          borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(138,180,248,0.35)",
          flexShrink: 0,
        }}
      >
        <Sparkles size={18} color="#fff" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
      >
        <motion.span
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{
            fontSize: 22, fontWeight: 700, letterSpacing: -0.5,
            background: G.gemGradient,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Flowra
        </motion.span>
        <span style={{ fontSize: 10, color: G.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>
          API Marketplace
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatCard({ label, value, color, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        background: G.surfaceAlt,
        border: `1px solid ${G.border}`,
        borderRadius: 20,
        padding: "24px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <motion.div
        style={{
          position: "absolute", top: -30, right: -30,
          width: 90, height: 90, borderRadius: "50%",
          background: color, opacity: 0.06,
          filter: "blur(16px)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: G.textSecondary, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={color} />
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        style={{ fontSize: 40, fontWeight: 700, color, lineHeight: 1 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}

/* ─── Section wrapper with stagger ──────────────────────────── */
const staggerParent = {
  animate: { transition: { staggerChildren: 0.07 } }
};
const staggerChild = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

/* ─── Page Loading Overlay ───────────────────────────────────── */
function PageLoader({ label = "Loading..." }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 260, gap: 16 }}>
      <GemSpinner size={48} />
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        style={{ color: G.textSecondary, fontSize: 14, fontWeight: 500 }}
      >
        {label}
      </motion.p>
    </div>
  );
}

/* ─── Toast ──────────────────────────────────────────────────── */
function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
            zIndex: 9999,
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px", borderRadius: 18,
            background: toast.type === "success" ? "#FFFFFF" : "#FFFFFF",
            border: `1px solid ${toast.type === "success" ? G.teal + "55" : G.red + "55"}`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px ${toast.type === "success" ? G.teal + "22" : G.red + "22"}`,
            backdropFilter: "blur(12px)",
          }}>
            {toast.type === "success"
              ? <CheckCircle2 size={18} color={G.teal} />
              : <AlertTriangle size={18} color={G.red} />
            }
            <span style={{ fontSize: 14, fontWeight: 600, color: G.textPrimary }}>{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Modal ──────────────────────────────────────────────────── */
function GemModal({
  confirmUpgrade,
  confirmSubscribe,
  setConfirmUpgrade,
  setConfirmSubscribe,
  upgradeNow,
  handleSubscribe,
  handlePayment,
  subLoading,
  setSubLoading
}){
  const show = confirmUpgrade.show || confirmSubscribe.show;
  const isUpgrade = confirmUpgrade.show;
  const isAlready = confirmSubscribe.already;

  const icon = isAlready
    ? { bg: G.blue + "18", color: G.blue, el: <ShieldCheck size={32} color={G.blue} /> }
    : isUpgrade
      ? { bg: G.purple + "18", color: G.purple, el: <ArrowUpRight size={32} color={G.purple} /> }
      : { bg: G.amber + "18", color: G.amber, el: <AlertTriangle size={32} color={G.amber} /> };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
          onClick={() => { setConfirmUpgrade({ show: false }); setConfirmSubscribe({ show: false }); }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: G.surfaceAlt,
              border: `1px solid ${icon.color}33`,
              borderRadius: 28,
              padding: "40px 36px",
              maxWidth: 420, width: "100%",
              textAlign: "center",
              boxShadow: `0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px ${icon.color}18`,
              position: "relative", overflow: "hidden",
            }}
          >
            {/* bg glow */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{
                position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
                width: 200, height: 200, borderRadius: "50%",
                background: icon.color, filter: "blur(40px)",
              }}
            />

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              style={{
                width: 72, height: 72, borderRadius: 22,
                background: icon.bg,
                border: `1px solid ${icon.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", position: "relative",
              }}
            >
              {icon.el}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                style={{
                  position: "absolute", inset: -4, borderRadius: 26,
                  border: `1px dashed ${icon.color}55`,
                }}
              />
            </motion.div>

            <h2 style={{ fontSize: 22, fontWeight: 700, color: G.textPrimary, marginBottom: 10 }}>
              {isUpgrade ? "Upgrade Subscription" : isAlready ? "Already Active" : "Confirm Subscription"}
            </h2>
            <p style={{ fontSize: 14, color: G.textSecondary, lineHeight: 1.65, marginBottom: 32, maxWidth: 320, margin: "0 auto 32px" }}>
              {isUpgrade
                ? "Your new request limits take effect immediately. Billing cycles adjust based on your tier."
                : isAlready
                  ? "You're already an active subscriber. Manage your plan in the Subscriptions tab."
                  : "Ready to integrate this API into your workflow? You'll get instant access upon confirming."}
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => { setConfirmUpgrade({ show: false }); setConfirmSubscribe({ show: false }); }}
                style={{
                  flex: 1, padding: "14px 0", borderRadius: 16, border: `1px solid ${G.border}`,
                  background: "transparent", color: G.textSecondary, fontWeight: 600, fontSize: 14,
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.target.style.background = "rgba(0,0,0,0.06)"; e.target.style.color = G.textPrimary; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = G.textSecondary; }}
              >
                Go Back
              </button>
             {!isAlready && (

  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}

    onClick={async () => {

      try {

        if (isUpgrade) {

          setSubLoading(confirmUpgrade.planId);

          await upgradeNow(confirmUpgrade.planId);

        } else {

          setSubLoading(confirmSubscribe.planId);

          await handlePayment(
            confirmSubscribe.plan,
            confirmSubscribe.api
          );

        }

      } finally {

        setSubLoading(null);

      }

    }}

    disabled={subLoading !== null}

    style={{
      flex: 1,
      padding: "14px 0",
      borderRadius: 16,
      border: "none",
      background: G.blueGrad,
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
      cursor: subLoading ? "not-allowed" : "pointer",
      opacity: subLoading ? 0.8 : 1,
      boxShadow: "0 4px 20px rgba(66,133,244,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }}
  >

    {subLoading !== null
      ? <GemSpinner size={20} />
      : "Confirm"}

  </motion.button>

)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function ConsumerDashboard() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("explore");
  const [subLoading, setSubLoading] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [subscriptions, setSubscriptions] = useState([]);
  const [subPageLoading, setSubPageLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [confirmUpgrade, setConfirmUpgrade] = useState({ show: false, planId: null });
  const [usageData, setUsageData] = useState([]);
  const [usageLoading, setUsageLoading] = useState(false);
  const [confirmSubscribe, setConfirmSubscribe] = useState({ show: false, planId: null, already: false });
  const [search, setSearch] = useState("");
 

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const totalSubs = subscriptions.length;
  const totalUsage = subscriptions.reduce((acc, sub) => acc + (sub.usedRequests || 0), 0);
  const activeSubs = subscriptions.filter(sub => new Date(sub.expiresAt) > new Date()).length;
  const recentSubs = subscriptions.slice(0, 3);

  useEffect(() => {
    const fetchApis = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setApis(data.apis || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApis();
  }, [token]);

  useEffect(() => { fetchSubscriptions(); }, []);

  const fetchSubscriptions = async () => {
    try {
      setSubPageLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/MySubscriptions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
    } catch (err) {
      console.log(err);
    } finally {
      setSubPageLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      setSubLoading(planId);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planId })
      });
      const data = await res.json();
      if (!res.ok) showToast(data.message || "Failed", "error");
      else { showToast("Subscribed successfully!"); await fetchSubscriptions(); }
    } catch (err) {
      showToast("Server error", "error");
    } finally {
      setSubLoading(null);
    }
  };


  //handle payment
  const handlePayment = async (plan, api) => {

  try {

    setSubLoading(plan._id);

    // FREE PLAN
    if (Number(plan.price) === 0) {

      await handleSubscribe(plan._id);

      setConfirmSubscribe({
        show: false,
        planId: null,
        already: false,
        plan: null,
        api: null
      });

      showToast(
        "Free Plan Activated!"
      );

      setSubLoading(null);

      return;
    }

    // CREATE ORDER
    const orderRes = await fetch(
      `${import.meta.env.VITE_API_URL}/CreatOrder`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          amount: plan.price,
          providerId: api.owner,
          apiId: api._id,
          planId: plan._id
        })
      }
    );

    const orderData =
      await orderRes.json();

    // ERROR CHECK
    if (!orderRes.ok) {

      showToast(
        orderData.message ||
        "Order creation failed",
        "error"
      );

      setSubLoading(null);

      return;
    }

    // RAZORPAY OPTIONS
    const options = {

      key: orderData.key,

      amount:
        orderData.order.amount,

      currency: "INR",

      name: "Flowra API",

      description:
        "API Subscription",

      order_id:
        orderData.order.id,

      handler: async function (
        response
      ) {

        try {

          // VERIFY PAYMENT
          const verifyRes =
            await fetch(
              `${import.meta.env.VITE_API_URL}/verifypayment`,
              {

                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${token}`
                },

                body: JSON.stringify({

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature

                })
              }
            );

          const verifyData =
            await verifyRes.json();

          if (
            verifyData.success
          ) {

            // CREATE SUBSCRIPTION
            await handleSubscribe(
              plan._id
            );

            // CLOSE MODAL
            setConfirmSubscribe({

              show: false,

              planId: null,

              already: false,

              plan: null,

              api: null

            });

            showToast(
              "Payment Successful!"
            );

          } else {

            showToast(
              "Payment verification failed",
              "error"
            );
          }

        } catch (err) {

          console.log(err);

          showToast(
            "Verification failed",
            "error"
          );
        }

        setSubLoading(null);
      },

      modal: {

        ondismiss: function () {

          setSubLoading(null);

          showToast(
            "Payment cancelled",
            "error"
          );
        }
      },

      prefill: {

        name:
          user?.name || "",

        email:
          user?.email || ""
      },

      theme: {
        color: "#1A73E8"
      }
    };

    // OPEN RAZORPAY
    const razor =
      new window.Razorpay(
        options
      );

    razor.open();

  } catch (error) {

    console.log(error);

    setSubLoading(null);

    showToast(
      "Payment failed",
      "error"
    );
  }
};


  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 2500);
  };

  const handleUpgrade = (planId, targetPrice, currentPrice) => {
    if (targetPrice === currentPrice) { showToast("Already on this plan", "error"); return; }
    setConfirmUpgrade({ show: true, planId });
  };

  const upgradeNow = async (planId) => {
    try {
      setSubLoading(planId);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upgrade`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planId })
      });
      if (res.ok) { showToast("Plan upgraded!"); fetchSubscriptions(); }
      else { const data = await res.json(); showToast(data.message || "Upgrade failed", "error"); }
    } catch {
      showToast("Server error", "error");
    } finally {
      setSubLoading(null);
      setConfirmUpgrade({ show: false, planId: null });
    }
  };

  const fetchUsage = async () => {
    try {
      setUsageLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usage-analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsageData(data.usage || []);
    } catch (err) {
      console.log(err);
    } finally {
      setUsageLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleChangePassword = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) showToast(data.message, "error");
      else { showToast("Password updated!"); setOldPassword(""); setNewPassword(""); }
    } catch {
      showToast("Server error", "error");
    }
  };

  /* ── Full page loader ── */
  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", background: "#F8F9FA", gap: 20 }}>
        <GemSpinner size={60} />
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ color: G.textSecondary, fontSize: 15, fontWeight: 500 }}
        >
          Initializing Flowra...
        </motion.p>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "explore", icon: Globe, label: "Explore APIs" },
    { id: "subscriptions", icon: CreditCard, label: "Subscriptions", action: fetchSubscriptions },
    { id: "usage", icon: BarChart3, label: "Analytics", action: fetchUsage },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F8F9FA", overflow: "hidden", fontFamily: "'Google Sans', 'Segoe UI', sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          width: 260, background: "#FFFFFF",
          borderRight: `1px solid ${G.border}`,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          flexShrink: 0, zIndex: 10,
        }}
      >
        <div>
          <FlowraLogo />

          <nav style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((tab, i) => {
              const active = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  onClick={() => { setActiveTab(tab.id); tab.action?.(); }}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "11px 16px", borderRadius: 14, border: "none",
                    background: active ? "rgba(138,180,248,0.12)" : "transparent",
                    color: active ? G.blue : G.textSecondary,
                    fontWeight: active ? 600 : 500, fontSize: 14,
                    cursor: "pointer", textAlign: "left", width: "100%",
                    transition: "all 0.18s", position: "relative",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = G.textPrimary; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G.textSecondary; } }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebarPill"
                      style={{
                        position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                        width: 3, height: 20, borderRadius: 4, background: G.blue,
                      }}
                    />
                  )}
                  <tab.icon size={18} />
                  {tab.label}
                </motion.button>
              );
            })}
          </nav>
        </div>

        <div style={{ padding: "16px 12px", borderTop: `1px solid ${G.border}` }}>
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "11px 16px", borderRadius: 14, border: "none",
              background: "transparent", color: G.red, fontWeight: 500, fontSize: 14,
              cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${G.red}12`}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <LogOut size={18} /> Sign Out
          </motion.button>
        </div>
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px", scrollbarWidth: "thin", scrollbarColor: `${G.border} transparent` }}>
        <AnimatePresence mode="wait">

          {/* ── DASHBOARD TAB ── */}
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <motion.header initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <Sparkles size={22} color={G.blue} />
                  </motion.div>
                  <h1 style={{ fontSize: 28, fontWeight: 700, color: G.textPrimary, margin: 0 }}>Welcome Back</h1>
                </div>
                <p style={{ color: G.textSecondary, margin: 0, fontSize: 15 }}>Here's what's happening with your APIs today.</p>
              </motion.header>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
                <StatCard label="Total Subscriptions" value={totalSubs} color={G.blue} icon={Layers} delay={0} />
                <StatCard label="Total Usage" value={totalUsage} color={G.purple} icon={TrendingUp} delay={0.08} />
                <StatCard label="Active APIs" value={activeSubs} color={G.teal} icon={Wifi} delay={0.16} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                style={{
                  background: G.surfaceAlt, border: `1px solid ${G.border}`,
                  borderRadius: 24, padding: "28px 32px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${G.blue}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Activity size={16} color={G.blue} />
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: G.textPrimary, margin: 0 }}>Recent Activity</h2>
                </div>
                {recentSubs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <Bell size={40} color={G.textMuted} style={{ marginBottom: 12 }} />
                    <p style={{ color: G.textMuted, margin: 0 }}>No recent subscriptions found.</p>
                  </div>
                ) : (
                  <motion.div variants={staggerParent} initial="initial" animate="animate" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {recentSubs.map((sub) => (
                      <motion.div
                        key={sub._id}
                        variants={staggerChild}
                        whileHover={{ x: 4 }}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px", borderRadius: 14,
                          border: `1px solid transparent`,
                          cursor: "default", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = G.border; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: G.blueGrad,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 16, fontWeight: 700, color: "#fff",
                          }}>
                            {sub.api?.name?.charAt(0)}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, color: G.textPrimary, fontSize: 14 }}>{sub.api?.name}</p>
                            <p style={{ margin: 0, fontSize: 11, color: G.blue, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{sub.plan?.name}</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 12, color: G.textMuted }}>{new Date(sub.expiresAt).toLocaleDateString()}</span>
                          <ChevronRight size={14} color={G.textMuted} />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* ── EXPLORE TAB ── */}
          {activeTab === "explore" && (
            <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
                <motion.h1 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 28, fontWeight: 700, color: G.textPrimary, margin: 0 }}>
                  Explore Marketplace
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ position: "relative", width: 340 }}
                >
                  <Search style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} size={16} color={G.textMuted} />
                  <input
                    type="text"
                    placeholder="Search APIs..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                      width: "100%", background: G.surfaceAlt,
                      border: `1px solid ${G.border}`, borderRadius: 14,
                      padding: "11px 16px 11px 40px", color: G.textPrimary,
                      fontSize: 14, outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={e => e.target.style.borderColor = G.blue + "66"}
                    onBlur={e => e.target.style.borderColor = G.border}
                  />
                </motion.div>
              </div>

              <motion.div variants={staggerParent} initial="initial" animate="animate" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {apis.filter(api => api.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                  <motion.div
                    variants={staggerChild}
                    style={{ background: G.surfaceAlt, border: `1px solid ${G.border}`, borderRadius: 24, padding: "80px 40px", textAlign: "center" }}
                  >
                    <Search size={44} color={G.textMuted} style={{ marginBottom: 16 }} />
                    <p style={{ color: G.textMuted, fontSize: 16, margin: 0 }}>No APIs match your search.</p>
                  </motion.div>
                ) : (
                  apis
                    .filter(api => api.name.toLowerCase().includes(search.toLowerCase()))
                    .map((api) => {
                      const isSubscribed = subscriptions.some(sub => sub.api?._id === api._id);
                      return (
                        <motion.div
                          key={api._id}
                          variants={staggerChild}
                          whileHover={{ y: -2, borderColor: G.border.replace("0.08", "0.18") }}
                          style={{
                            background: G.surfaceAlt,
                            border: `1px solid ${G.border}`,
                            borderRadius: 24, padding: "28px 32px",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: G.blueGrad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                              {api.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: G.textPrimary }}>{api.name}</h3>
                                <span style={{
                                  display: "flex", alignItems: "center", gap: 4,
                                  fontSize: 10, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700,
                                  padding: "3px 10px", borderRadius: 20,
                                  background: api.isActive ? `${G.teal}18` : `${G.red}18`,
                                  color: api.isActive ? G.teal : G.red,
                                }}>
                                  <motion.div
                                    animate={api.isActive ? { scale: [1, 1.4, 1] } : {}}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    style={{ width: 6, height: 6, borderRadius: "50%", background: api.isActive ? G.teal : G.red }}
                                  />
                                  {api.isActive ? "Live" : "Down"}
                                </span>
                              </div>
                              <p style={{ margin: "2px 0 0", fontSize: 12, color: G.blue, fontFamily: "monospace" }}>
                                <Code2 size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />{api.endpoint}
                              </p>
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginTop: 20 }}>
                            {api.plans?.map(plan => (
                              <motion.div
                                key={plan._id}
                                whileHover={{ scale: 1.02 }}
                                style={{
                                  background: "#F8F9FA",
                                  border: `1px solid ${G.border}`,
                                  borderRadius: 18, padding: "18px 20px",
                                  display: "flex", flexDirection: "column", gap: 4,
                                }}
                              >
                                <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, color: G.textMuted, fontWeight: 700 }}>{plan.name}</span>
                                <span style={{ fontSize: 22, fontWeight: 700, color: G.textPrimary }}>₹{plan.price}</span>
                                <span style={{ fontSize: 12, color: G.textSecondary }}>{plan.requestLimit.toLocaleString()} requests</span>
                                <motion.button
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => {
                                    if (!api.isActive) return;

                                    setConfirmSubscribe({
                                      show: true,
                                      already: isSubscribed,
                                      planId: isSubscribed ? null : plan._id,
                                      plan,
                                      api
                                    });
                                  }}
                                  disabled={subLoading === plan._id || !api.isActive}
                                  style={{
                                    marginTop: 12, width: "100%", padding: "9px 0", borderRadius: 12, border: "none",
                                    background: !api.isActive ? "rgba(0,0,0,0.06)" :
                                      isSubscribed ? `${G.teal}18` : G.blueGrad,
                                    color: !api.isActive ? G.textMuted :
                                      isSubscribed ? G.teal : "#fff",
                                    fontWeight: 700, fontSize: 13, cursor: !api.isActive ? "not-allowed" : "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                    boxShadow: (!api.isActive || isSubscribed) ? "none" : "0 4px 14px rgba(66,133,244,0.35)",
                                  }}
                                >
                                  {subLoading === plan._id
                                    ? <GemSpinner size={16} />
                                    : !api.isActive ? "Unavailable"
                                      : isSubscribed ? <><CheckCircle2 size={13} /> Active</>
                                        : "Subscribe"}
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })
                )}
              </motion.div>
            </motion.div>
          )}

          {/* ── SUBSCRIPTIONS TAB ── */}
         {activeTab === "subscriptions" && (
  <motion.div key="subscriptions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>

    {/* Header */}
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: G.textPrimary, margin: "0 0 4px" }}>Active Subscriptions</h1>
        <p style={{ margin: 0, fontSize: 14, color: G.textSecondary }}>Manage your API plans, track usage, and access integration keys.</p>
      </motion.div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: `${G.teal}18`, color: G.teal, display: "flex", alignItems: "center", gap: 5 }}>
          <Wifi size={12} /> {activeSubs} active
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: `${G.red}18`, color: G.red, display: "flex", alignItems: "center", gap: 5 }}>
          <AlertTriangle size={12} /> {totalSubs - activeSubs} expired
        </span>
      </div>
    </div>

    {subPageLoading ? (
      <PageLoader label="Fetching your subscriptions..." />
    ) : subscriptions.length === 0 ? (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: G.surfaceAlt, border: `1px solid ${G.border}`, borderRadius: 24, padding: "80px 40px", textAlign: "center" }}>
        <CreditCard size={44} color={G.textMuted} style={{ marginBottom: 16 }} />
        <p style={{ color: G.textMuted, margin: 0 }}>No subscriptions yet. Explore the marketplace!</p>
      </motion.div>
    ) : (
      <motion.div variants={staggerParent} initial="initial" animate="animate" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {subscriptions.map((sub) => {
          const total = sub.requestLimitSnapshot || sub.plan?.requestLimit || 0;
          const used = sub.usedRequests || 0;
          const percent = total ? Math.min((used / total) * 100, 100) : 0;
          const isExpired = new Date(sub.expiresAt) < new Date();
          const apiPlans = apis.find(a => a._id === sub.api?._id)?.plans || [];
          const barColor = isExpired ? G.red : percent > 85 ? G.red : percent > 60 ? G.amber : G.teal;
          const code = `fetch("${import.meta.env.VITE_API_URL}/use/${sub.api?.endpoint}", {\n  method: "${sub.api?.method}",\n  headers: {\n    "Content-Type": "application/json",\n    "x-api-key": "${user?.apiKey}"\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data));`;

          return (
            <motion.div
              key={sub._id}
              variants={staggerChild}
              whileHover={{ y: -2 }}
              style={{
                background: G.surfaceAlt,
                border: `1px solid ${isExpired ? G.red + "44" : G.border}`,
                borderRadius: 24,
                padding: "28px 32px",
                opacity: isExpired ? 0.75 : 1,
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.09)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              {/* ── Card Header ── */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: G.blueGrad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {sub.api?.name?.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 700, color: G.textPrimary }}>{sub.api?.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: G.textSecondary }}>
                    {sub.plan?.name} · ₹{sub.plan?.price}/mo · {isExpired ? "Expired" : "Renews"} {new Date(sub.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, flexShrink: 0,
                  display: "flex", alignItems: "center", gap: 5,
                  background: isExpired ? `${G.red}18` : `${G.teal}18`,
                  color: isExpired ? G.red : G.teal,
                }}>
                  {isExpired ? <><AlertTriangle size={11} /> Expired</> : <><CheckCircle2 size={11} /> Active</>}
                </span>
              </div>

              {/* ── Instruction banner ── */}
              {isExpired ? (
                <div style={{ background: `${G.red}10`, border: `1px solid ${G.red}30`, borderRadius: 12, padding: "10px 14px", fontSize: 12, color: G.red, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <AlertTriangle size={14} /> This subscription has expired. Renew to restore API access.
                </div>
              ) : (
                <div style={{ background: `${G.blue}0f`, border: `1px solid ${G.blue}30`, borderRadius: 12, padding: "10px 14px", fontSize: 12, color: G.blue, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <ShieldCheck size={14} /> Send your API key in the <strong>&nbsp;x-api-key&nbsp;</strong> header with every request. Never expose it in client-side code.
                </div>
              )}

              {/* ── Integration details grid ── */}
              {!isExpired && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 600, color: G.textMuted, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                    <Zap size={12} /> Integration Details
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 8, marginBottom: 16 }}>
                    {[
                      { icon: Globe, label: "Base URL", val: `${import.meta.env.VITE_API_URL}/use` },
                      { icon: Code2, label: "Endpoint", val: sub.api?.endpoint },
                      { icon: Activity, label: "Method", val: sub.api?.method },
                      { icon: Lock, label: "API Key", val: user?.apiKey, copy: true },
                    ].map(({ icon: Icon, label, val, copy }) => (
                      <div key={label} style={{ background: "#F0F2F5", borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${G.blue}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={13} color={G.blue} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: 10, color: G.textMuted, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600 }}>{label}</p>
                          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: G.textPrimary, fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</p>
                        </div>
                        {copy && (
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { navigator.clipboard.writeText(val || ""); showToast("API key copied!"); }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: G.blue, padding: 0, marginLeft: "auto", flexShrink: 0 }}>
                            <Copy size={13} />
                          </motion.button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ── Code snippet ── */}
                  <p style={{ fontSize: 11, fontWeight: 600, color: G.textMuted, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                    <Code2 size={12} /> Quick Start
                  </p>
                  <div style={{ background: "#111827", borderRadius: 14, padding: "14px 18px", fontFamily: "monospace", fontSize: 12, color: "#E2E8F0", lineHeight: 1.7, overflowX: "auto", position: "relative", marginBottom: 16 }}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => { navigator.clipboard.writeText(code); showToast("Code copied!"); }}
                      style={{ position: "absolute", top: 10, right: 12, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "4px 8px", cursor: "pointer", color: "#94A3B8", display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                      <Copy size={11} /> Copy
                    </motion.button>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{code}</pre>
                  </div>
                </>
              )}

              {/* ── Usage bar ── */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, color: G.textMuted, display: "flex", alignItems: "center", gap: 5 }}>
                    <BarChart3 size={12} /> Request Usage
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: percent > 85 ? G.red : G.textPrimary }}>
                    {used.toLocaleString()} / {total.toLocaleString()}
                  </span>
                </div>
                <div style={{ height: 6, background: "rgba(0,0,0,0.07)", borderRadius: 4, overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: "100%", background: barColor, borderRadius: 4 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 11, color: G.textMuted }}>
                  <span>{Math.round(percent)}% used</span>
                  <span>{(total - used).toLocaleString()} remaining</span>
                </div>
              </div>

              {/* ── Upgrade buttons ── */}
              {apiPlans.filter(p => p._id !== sub.plan?._id).length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  {apiPlans.filter(p => p._id !== sub.plan?._id).map(plan => (
                    <motion.button key={plan._id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => handleUpgrade(plan._id, plan.price, sub.plan?.price)}
                      style={{ fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 10, border: `1px solid ${G.purple}40`, background: `${G.purple}10`, color: G.purple, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                      <ArrowUpRight size={12} /> Upgrade to {plan.name}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    )}
  </motion.div>
)}
          {/* ── ANALYTICS TAB ── */}
          {activeTab === "usage" && (
            <motion.div key="usage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <motion.h1 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 28, fontWeight: 700, color: G.textPrimary, margin: "0 0 32px" }}>
                Real-time Analytics
              </motion.h1>
              {usageLoading ? (
                <PageLoader label="Fetching analytics data..." />
              ) : usageData.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: G.surfaceAlt, border: `1px solid ${G.border}`, borderRadius: 24, padding: "80px 40px", textAlign: "center" }}>
                  <BarChart2 size={44} color={G.textMuted} style={{ marginBottom: 16 }} />
                  <p style={{ color: G.textMuted, margin: 0 }}>No analytics data yet.</p>
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerParent} initial="initial" animate="animate"
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}
                >
                  {usageData.map((item, i) => {
                    const percent = item.limit ? Math.min((item.used / item.limit) * 100, 100) : 0;
                    const bars = [...Array(24)].map(() => Math.random());
                    return (
                      <motion.div
                        key={i}
                        variants={staggerChild}
                        whileHover={{ y: -3 }}
                        style={{ background: G.surfaceAlt, border: `1px solid ${G.border}`, borderRadius: 24, padding: "24px 28px" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: G.textPrimary }}>{item.apiName}</h3>
                          <span style={{ fontSize: 12, fontWeight: 700, background: `${G.blue}18`, color: G.blue, padding: "4px 12px", borderRadius: 20 }}>
                            {item.used} calls
                          </span>
                        </div>
                        <div style={{ height: 72, display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 16 }}>
                          {bars.map((h, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ height: 0 }}
                              animate={{ height: `${h * 100}%` }}
                              transition={{ delay: idx * 0.02, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              style={{
                                flex: 1, borderRadius: "2px 2px 0 0",
                                background: h > 0.7 ? G.purple : h > 0.4 ? G.blue : `${G.blue}40`,
                              }}
                            />
                          ))}
                        </div>
                        <div style={{ height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 4, overflow: "hidden" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: "100%", background: G.blueGrad, borderRadius: 4 }}
                          />
                        </div>
                        <p style={{ textAlign: "right", fontSize: 11, color: G.textMuted, marginTop: 6, margin: "6px 0 0" }}>{Math.round(percent)}% used</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === "settings" && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ maxWidth: 640 }}>
              <motion.h1 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 28, fontWeight: 700, color: G.textPrimary, margin: "0 0 32px" }}>
                Account Settings
              </motion.h1>

              <motion.div variants={staggerParent} initial="initial" animate="animate" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Security */}
                <motion.section variants={staggerChild} style={{ background: G.surfaceAlt, border: `1px solid ${G.border}`, borderRadius: 24, padding: "28px 32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: `${G.teal}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Shield size={18} color={G.teal} />
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: G.textPrimary, margin: 0 }}>Security & Access</h2>
                  </div>
                  <p style={{ fontSize: 13, color: G.textSecondary, margin: "0 0 18px" }}>
                    Linked to: <span style={{ color: G.textPrimary, fontWeight: 600 }}>{JSON.parse(localStorage.getItem("user") || "{}")?.email}</span>
                  </p>
                  <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: G.textMuted, fontWeight: 700, margin: "0 0 8px" }}>Master API Key</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#F8F9FA", border: `1px solid ${G.border}`, borderRadius: 14, padding: "12px 16px" }}>
                    <span style={{ flex: 1, fontFamily: "monospace", fontSize: 13, color: G.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {JSON.parse(localStorage.getItem("user") || "{}")?.apiKey || "••••••••••••••••••••"}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { navigator.clipboard.writeText(JSON.parse(localStorage.getItem("user") || "{}")?.apiKey || ""); showToast("Key Copied!"); }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: G.blue, padding: 4 }}
                    >
                      <Copy size={16} />
                    </motion.button>
                  </div>
                </motion.section>

                {/* Password */}
                <motion.section variants={staggerChild} style={{ background: G.surfaceAlt, border: `1px solid ${G.border}`, borderRadius: 24, padding: "28px 32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: `${G.purple}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Lock size={18} color={G.purple} />
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: G.textPrimary, margin: 0 }}>Password Management</h2>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { val: oldPassword, set: setOldPassword, ph: "Current password" },
                      { val: newPassword, set: setNewPassword, ph: "New password" },
                    ].map(({ val, set, ph }) => (
                      <input
                        key={ph}
                        type="password"
                        placeholder={ph}
                        value={val}
                        onChange={e => set(e.target.value)}
                        style={{
                          background: "#F8F9FA", border: `1px solid ${G.border}`,
                          borderRadius: 14, padding: "12px 16px", color: G.textPrimary,
                          fontSize: 14, outline: "none",
                        }}
                        onFocus={e => e.target.style.borderColor = G.purple + "66"}
                        onBlur={e => e.target.style.borderColor = G.border}
                      />
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleChangePassword}
                      style={{
                        padding: "13px 0", borderRadius: 14, border: "none",
                        background: "linear-gradient(135deg, #6B4EE8 0%, #9B6BF5 100%)",
                        color: "#fff", fontWeight: 700, fontSize: 14,
                        cursor: "pointer", boxShadow: "0 4px 18px rgba(107,78,232,0.4)",
                      }}
                    >
                      Update Credentials
                    </motion.button>
                  </div>
                </motion.section>

                {/* Theme */}
                <motion.section
                  variants={staggerChild}
                  style={{ background: G.surfaceAlt, border: `1px solid ${G.border}`, borderRadius: 24, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: G.textPrimary, margin: "0 0 4px" }}>Visual Theme</h2>
                    <p style={{ fontSize: 13, color: G.textSecondary, margin: 0 }}>Dark mode is currently in beta.</p>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 20, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => document.body.classList.toggle("dark")}
                    style={{
                      width: 44, height: 44, borderRadius: 14, border: `1px solid ${G.border}`,
                      background: "rgba(0,0,0,0.04)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Moon size={20} color={G.blue} />
                  </motion.button>
                </motion.section>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── TOAST ── */}
      <Toast toast={toast} />

      {/* ── MODAL ── */}
      <GemModal
  confirmUpgrade={confirmUpgrade}
  confirmSubscribe={confirmSubscribe}
  setConfirmUpgrade={setConfirmUpgrade}
  setConfirmSubscribe={setConfirmSubscribe}
  upgradeNow={upgradeNow}
  handleSubscribe={handleSubscribe}
  handlePayment={handlePayment}
  subLoading={subLoading}
  setSubLoading={setSubLoading}
/>
    </div>
  );
}
