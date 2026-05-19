import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Code2, PlusCircle, CreditCard,
  LogOut, Trash2, Settings, ChevronRight, Menu, X,
  CheckCircle2, AlertCircle, Loader2, Pencil,
  ShieldOff, Sparkles, Zap, Search, TrendingUp,
  Wallet, Activity, ArrowUpRight, Bell, RefreshCw,
  Building2, BadgeCheck, XCircle, Clock, Filter,
  ChevronDown, Eye, EyeOff, DollarSign, BarChart3,
  ArrowDownRight, Banknote, Receipt
} from "lucide-react";

// ─── Toast Notification ────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border pointer-events-auto min-w-[300px] ${
              t.type === "success"
                ? "bg-white border-emerald-100 shadow-emerald-100/50"
                : t.type === "warning"
                ? "bg-white border-amber-100 shadow-amber-100/50"
                : "bg-white border-red-100 shadow-red-100/50"
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              t.type === "success" ? "bg-emerald-50" : t.type === "warning" ? "bg-amber-50" : "bg-red-50"
            }`}>
              {t.type === "success"
                ? <CheckCircle2 size={16} className="text-emerald-500" />
                : t.type === "warning"
                ? <AlertCircle size={16} className="text-amber-500" />
                : <XCircle size={16} className="text-red-500" />
              }
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{t.title}</p>
              {t.message && <p className="text-xs text-gray-500 mt-0.5">{t.message}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Confirm Modal ─────────────────────────────────────────────────────────
function ConfirmModal({ open, onClose, title, description, icon, iconBg, confirmLabel, confirmClass, onConfirm, loading, children }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-[400px] overflow-hidden"
          >
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-400" />
            <div className="p-7">
              {icon && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                  className={`w-14 h-14 rounded-2xl ${iconBg || "bg-gray-50"} flex items-center justify-center mx-auto mb-5 shadow-sm`}
                >
                  {icon}
                </motion.div>
              )}
              <h2 className="text-[18px] font-bold text-gray-900 text-center tracking-tight mb-2">{title}</h2>
              {description && <p className="text-sm text-gray-500 text-center leading-relaxed">{description}</p>}
              {children && <div className="mt-5">{children}</div>}
              <div className="flex gap-3 mt-7">
                <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${confirmClass}`}
                >
                  {loading ? <Loader2 size={15} className="animate-spin" /> : confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Success Modal ─────────────────────────────────────────────────────────
function SuccessModal({ open, onClose, title, description, icon, iconBg, actionLabel, onAction }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-[380px] overflow-hidden text-center"
          >
            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
            <div className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                className={`w-16 h-16 rounded-2xl ${iconBg || "bg-emerald-50"} flex items-center justify-center mx-auto mb-5`}
              >
                {icon}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-7">{description}</p>
                <div className="flex gap-3">
                  <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                    Close
                  </button>
                  {actionLabel && (
                    <button onClick={onAction} className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-black transition-all">
                      {actionLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, iconBg, trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 24 }}
      whileHover={{ y: -3, shadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-default group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
            {trend >= 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
    </motion.div>
  );
}

// ─── Search Input ──────────────────────────────────────────────────────────
function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
      />
    </div>
  );
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-2xl ${className}`} />;
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function ProviderDashboard() {
  const [data, setData] = useState({ totalApis: 0, totalSubscribers: 0, totalEarnings: 0, wallet: {} });
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Edit states
  const [editApi, setEditApi] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editPlan, setEditPlan] = useState(null);
  const [editPlanForm, setEditPlanForm] = useState({});
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const [disableTarget, setDisableTarget] = useState(null);
  const [isDisabling, setIsDisabling] = useState(false);

  // Modal states
  const [showCreateApiSuccess, setShowCreateApiSuccess] = useState(false);
  const [showCreatePlanSuccess, setShowCreatePlanSuccess] = useState(false);
  const [showCreateApiConfirm, setShowCreateApiConfirm] = useState(false);
  const [showCreatePlanConfirm, setShowCreatePlanConfirm] = useState(false);
  const [showUpdateApiSuccess, setShowUpdateApiSuccess] = useState(false);
  const [showUpdatePlanSuccess, setShowUpdatePlanSuccess] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const [showBankSuccess, setShowBankSuccess] = useState(false);

  // Data states
  const [withdrawals, setWithdrawals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [bankForm, setBankForm] = useState({ accountNumber: "", ifsc: "", accountHolderName: "", upiId: "" });
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [savingBank, setSavingBank] = useState(false);
  const [fetchingWithdrawals, setFetchingWithdrawals] = useState(false);
  const [fetchingTransactions, setFetchingTransactions] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  // Search states
  const [apiSearch, setApiSearch] = useState("");
  const [txSearch, setTxSearch] = useState("");
  const [wdSearch, setWdSearch] = useState("");

  const [apiForm, setApiForm] = useState({ name: "", description: "", endpoint: "", externalUrl: "", method: "GET", price: 0, freeLimit: 0 });
  const [planForm, setPlanForm] = useState({ api: "", name: "", price: "", requestLimit: "", duration: 30 });

  const token = localStorage.getItem("token");

  const addToast = useCallback((title, message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const fetchData = async () => {
    try {
      const dash = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/provider`, { headers: { Authorization: `Bearer ${token}` } });
      setData(await dash.json());
      const apiRes = await fetch(`${import.meta.env.VITE_API_URL}/provider/apis`, { headers: { Authorization: `Bearer ${token}` } });
      const apiData = await apiRes.json();
      setApis(apiData.apis || []);
      setLoading(false);
    } catch {
      setLoading(false);
      addToast("Connection failed", "Could not reach the server", "error");
    }
  };

  const fetchWithdrawals = async () => {
    setFetchingWithdrawals(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/provider/withdrawals`, { headers: { Authorization: `Bearer ${token}` } });
      setWithdrawals(await res.json());
    } catch { addToast("Error", "Failed to load withdrawals", "error"); }
    finally { setFetchingWithdrawals(false); }
  };

  const fetchTransactions = async () => {
    setFetchingTransactions(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/provider/transactions`, { headers: { Authorization: `Bearer ${token}` } });
      setTransactions(await res.json());
    } catch { addToast("Error", "Failed to load transactions", "error"); }
    finally { setFetchingTransactions(false); }
  };

  const fetchBankDetails = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/provider/bank`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await res.json();
      if (d?.bank) setBankForm(d.bank);
    } catch {}
  };

  useEffect(() => {
    if (token) { fetchData(); fetchWithdrawals(); fetchTransactions(); fetchBankDetails(); }
  }, [token]);

  const handleCreateAPI = () => {
    if (!apiForm.name || !apiForm.endpoint) return addToast("Validation Error", "Name and Endpoint are required", "error");
    setShowCreateApiConfirm(true);
  };

  const confirmCreateAPI = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(apiForm)
      });
      setShowCreateApiConfirm(false);
      if (res.ok) { setShowCreateApiSuccess(true); fetchData(); }
      else addToast("Failed", "Could not create API", "error");
    } catch { addToast("Server error", "", "error"); setShowCreateApiConfirm(false); }
    finally { setIsSubmitting(false); }
  };

  const handleCreatePlan = () => {
    if (!planForm.api || !planForm.name) return addToast("Validation Error", "Select an API and plan name", "error");
    setShowCreatePlanConfirm(true);
  };

  const confirmCreatePlan = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/createPlan`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(planForm)
      });
      const d = await res.json();
      setShowCreatePlanConfirm(false);
      if (res.ok) { setShowCreatePlanSuccess(true); await fetchData(); }
      else addToast("Failed", d.message || "Could not create plan", "error");
    } catch { addToast("Server error", "", "error"); setShowCreatePlanConfirm(false); }
    finally { setIsSubmitting(false); }
  };

  const handleUpdateAPI = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/updateApi/${editApi._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm)
      });
      const d = await res.json();
      if (!d.api) { addToast("Update failed", "", "error"); return; }
      await fetchData();
      setEditApi(null);
      setShowUpdateApiSuccess(true);
    } catch { addToast("Update failed", "", "error"); }
    finally { setIsSubmitting(false); }
  };

  const confirmDisable = async () => {
    if (!disableTarget) return;
    setIsDisabling(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Inactiveapi/${disableTarget._id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      const d = await res.json();
      if (!res.ok) { addToast("Failed", d.message || "Could not disable API", "error"); return; }
      setApis(prev => prev.map(a => a._id === disableTarget._id ? { ...a, isActive: false } : a));
      addToast("API Disabled", `"${disableTarget.name}" is now inactive`);
    } catch { addToast("Error", "Something went wrong", "error"); }
    finally { setIsDisabling(false); setDisableTarget(null); }
  };

  const handleEnable = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Activeapi/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) { addToast("Failed", "Could not enable API", "error"); return; }
      setApis(prev => prev.map(a => a._id === id ? { ...a, isActive: true } : a));
      addToast("API Enabled", "Your API is now active");
    } catch { addToast("Error", "", "error"); }
  };

  const handleUpdatePlan = async () => {
    setIsUpdatingPlan(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/plan/${editPlan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editPlanForm)
      });
      const d = await res.json();
      if (!res.ok) { addToast("Failed", d.message || "Update failed", "error"); return; }
      await fetchData();
      setEditPlan(null);
      setShowUpdatePlanSuccess(true);
    } catch { addToast("Error updating plan", "", "error"); }
    finally { setIsUpdatingPlan(false); }
  };

  const handleWithdrawal = async () => {
    if (Number(withdrawAmount) <= 0) return addToast("Invalid amount", "Enter a positive value", "error");
    if (Number(withdrawAmount) > Number(data.wallet?.pending || 0))
      return addToast("Insufficient balance", "Amount exceeds pending balance", "warning");
    setShowWithdrawConfirm(true);
  };

  const confirmWithdrawal = async () => {
    setWithdrawLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/requestWithdrawal`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(withdrawAmount) })
      });
      const result = await res.json();
      setShowWithdrawConfirm(false);
      if (!res.ok) throw new Error(result.message);
      setShowWithdrawSuccess(true);
      fetchWithdrawals();
      setWithdrawAmount("");
    } catch (err) { addToast("Failed", err.message, "error"); setShowWithdrawConfirm(false); }
    finally { setWithdrawLoading(false); }
  };

  const saveBankDetails = async () => {
    setSavingBank(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/provider/bank`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(bankForm)
      });
      const d = await res.json();
      if (res.ok) setShowBankSuccess(true);
      else addToast("Failed", d.message, "error");
    } catch { addToast("Server error", "", "error"); }
    finally { setSavingBank(false); }
  };

  const planSuggestions = ["Starter", "Professional", "Business", "Enterprise", "Free Trial", "Growth"];

  const filteredApis = apis.filter(a =>
    a.name?.toLowerCase().includes(apiSearch.toLowerCase()) ||
    a.endpoint?.toLowerCase().includes(apiSearch.toLowerCase())
  );

  const filteredTransactions = transactions.filter(t =>
    t.user?.name?.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.plan?.name?.toLowerCase().includes(txSearch.toLowerCase())
  );

  const filteredWithdrawals = withdrawals.filter(w =>
    w.status?.toLowerCase().includes(wdSearch.toLowerCase()) ||
    String(w.amount).includes(wdSearch)
  );

  const navItems = [
    { id: "dashboard", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "apis", label: "My APIs", icon: <Code2 size={16} /> },
    { id: "createApi", label: "Deploy API", icon: <PlusCircle size={16} /> },
    { id: "createPlan", label: "Create Plan", icon: <CreditCard size={16} /> },
    { id: "transactions", label: "Transactions", icon: <Receipt size={16} /> },
    { id: "withdrawals", label: "Withdrawals", icon: <Banknote size={16} /> },
    { id: "bank", label: "Bank Details", icon: <Building2 size={16} /> },
  ];

  const pageVariants = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <div className="flex h-screen bg-[#F7F8FA] font-sans overflow-hidden" style={{ fontFamily: "'DM Sans', 'Outfit', system-ui, sans-serif" }}>
      <Toast toasts={toasts} />

      {/* ─── All Modals ─────────────────────────────────────────────── */}
      <ConfirmModal
        open={!!disableTarget}
        onClose={() => setDisableTarget(null)}
        title="Disable this API?"
        description={`"${disableTarget?.name}" will be marked inactive. Subscribers will lose access until re-enabled.`}
        icon={<ShieldOff size={22} className="text-red-500" />}
        iconBg="bg-red-50"
        confirmLabel="Yes, Disable"
        confirmClass="bg-red-500 hover:bg-red-600 text-white shadow-red-200 shadow-lg"
        onConfirm={confirmDisable}
        loading={isDisabling}
      />

      <ConfirmModal
        open={showCreateApiConfirm}
        onClose={() => setShowCreateApiConfirm(false)}
        title="Deploy this API?"
        description="By publishing, you agree to Flowra's Provider Terms. You're responsible for uptime, rate limits, and accurate pricing."
        icon={<Zap size={22} className="text-blue-500" />}
        iconBg="bg-blue-50"
        confirmLabel="Deploy Now"
        confirmClass="bg-blue-600 hover:bg-blue-700 text-white"
        onConfirm={confirmCreateAPI}
        loading={isSubmitting}
      />

      <ConfirmModal
        open={showCreatePlanConfirm}
        onClose={() => setShowCreatePlanConfirm(false)}
        title="Publish pricing plan?"
        description="Subscribers will see this plan immediately. You can edit pricing at any time from My APIs."
        icon={<CreditCard size={22} className="text-violet-500" />}
        iconBg="bg-violet-50"
        confirmLabel="Publish Plan"
        confirmClass="bg-violet-600 hover:bg-violet-700 text-white"
        onConfirm={confirmCreatePlan}
        loading={isSubmitting}
      />

      <ConfirmModal
        open={showWithdrawConfirm}
        onClose={() => setShowWithdrawConfirm(false)}
        title="Confirm withdrawal"
        description={`You're requesting ₹${withdrawAmount} from your pending balance. This will be processed within 2–5 business days.`}
        icon={<Wallet size={22} className="text-emerald-500" />}
        iconBg="bg-emerald-50"
        confirmLabel="Confirm Withdrawal"
        confirmClass="bg-emerald-500 hover:bg-emerald-600 text-white"
        onConfirm={confirmWithdrawal}
        loading={withdrawLoading}
      />

      <SuccessModal
        open={showCreateApiSuccess}
        onClose={() => setShowCreateApiSuccess(false)}
        title="API Deployed! 🚀"
        description="Your API is now live on Flowra. Head to My APIs to create a pricing plan and start earning."
        icon={<Zap size={24} className="text-blue-500" />}
        iconBg="bg-blue-50"
        actionLabel="View My APIs"
        onAction={() => { setShowCreateApiSuccess(false); setActiveTab("apis"); }}
      />

      <SuccessModal
        open={showCreatePlanSuccess}
        onClose={() => setShowCreatePlanSuccess(false)}
        title="Plan Published! ✨"
        description="Your pricing tier is live. Subscribers can find and purchase it right now."
        icon={<Sparkles size={24} className="text-violet-500" />}
        iconBg="bg-violet-50"
        actionLabel="View My APIs"
        onAction={() => { setShowCreatePlanSuccess(false); setActiveTab("apis"); }}
      />

      <SuccessModal
        open={showUpdateApiSuccess}
        onClose={() => setShowUpdateApiSuccess(false)}
        title="API Updated!"
        description="Your API settings have been saved successfully."
        icon={<CheckCircle2 size={24} className="text-emerald-500" />}
        iconBg="bg-emerald-50"
      />

      <SuccessModal
        open={showUpdatePlanSuccess}
        onClose={() => setShowUpdatePlanSuccess(false)}
        title="Plan Updated!"
        description="Your pricing tier has been updated and is now live."
        icon={<CheckCircle2 size={24} className="text-emerald-500" />}
        iconBg="bg-emerald-50"
      />

      <SuccessModal
        open={showWithdrawSuccess}
        onClose={() => setShowWithdrawSuccess(false)}
        title="Withdrawal Requested!"
        description="Your payout request has been submitted. You'll receive funds within 2–5 business days."
        icon={<Banknote size={24} className="text-emerald-500" />}
        iconBg="bg-emerald-50"
        actionLabel="View History"
        onAction={() => { setShowWithdrawSuccess(false); setActiveTab("withdrawals"); }}
      />

      <SuccessModal
        open={showBankSuccess}
        onClose={() => setShowBankSuccess(false)}
        title="Bank Details Saved!"
        description="Your payout information has been securely updated."
        icon={<Building2 size={24} className="text-blue-500" />}
        iconBg="bg-blue-50"
      />

      {/* ─── Sidebar ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-100/80 flex flex-col transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ boxShadow: "4px 0 24px rgba(0,0,0,0.04)" }}>
        
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200"
            >
              <Sparkles size={14} className="text-white" />
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent tracking-tight">Flowra</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] px-3 mb-3 mt-1">Main Menu</p>
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] font-medium ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className={activeTab === item.id ? "text-blue-600" : "text-gray-400"}>{item.icon}</span>
              {item.label}
              {activeTab === item.id && (
                <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-50">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all text-[13px] font-medium group">
            <LogOut size={15} className="group-hover:translate-x-0.5 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-14 border-b border-gray-100 bg-white/90 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-xl"><Menu size={18} /></button>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <span className="text-gray-400">Provider</span>
              <ChevronRight size={11} />
              <span className="text-gray-800 capitalize">{navItems.find(n => n.id === activeTab)?.label || activeTab}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchData} className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl hover:text-blue-500 transition-all" title="Refresh">
              <RefreshCw size={16} />
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">P</div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-5xl mx-auto pb-20">
            <AnimatePresence mode="wait">

              {/* ─── DASHBOARD ─────────────────────────────────────────── */}
              {activeTab === "dashboard" && (
                <motion.div key="dash" {...pageVariants} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-gray-900 tracking-tight">
                      Good morning 👋
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-sm text-gray-500 mt-1">
                      Here's what's happening with your APIs today.
                    </motion.p>
                  </div>

                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <StatCard delay={0} label="Total Earned" value={`₹${data.wallet?.totalEarned || 0}`} icon={<TrendingUp size={16} className="text-emerald-600" />} iconBg="bg-emerald-50" trend={12} />
                      <StatCard delay={0.06} label="Pending Balance" value={`₹${data.wallet?.pending || 0}`} icon={<Clock size={16} className="text-amber-600" />} iconBg="bg-amber-50" />
                      <StatCard delay={0.12} label="Withdrawn" value={`₹${data.wallet?.withdrawn || 0}`} icon={<Banknote size={16} className="text-blue-600" />} iconBg="bg-blue-50" />
                      <StatCard delay={0.18} label="Subscribers" value={data.totalSubscribers || 0} icon={<Activity size={16} className="text-violet-600" />} iconBg="bg-violet-50" trend={5} />
                    </div>
                  )}

                  {/* Wallet Actions */}
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
                    <h2 className="text-base font-bold text-gray-900 mb-1">Wallet</h2>
                    <p className="text-xs text-gray-400 mb-5">Manage earnings and withdrawals</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button onClick={() => setActiveTab("withdrawals")}
                        className="group flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-blue-200">
                        Request Withdrawal
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                      <button onClick={() => setActiveTab("transactions")}
                        className="group flex items-center justify-between bg-gray-50 hover:bg-gray-100 text-gray-800 px-5 py-4 rounded-2xl font-semibold text-sm transition-all border border-gray-100">
                        View Transactions
                        <Receipt size={15} className="text-gray-400" />
                      </button>
                      <button onClick={() => setActiveTab("bank")}
                        className="group flex items-center justify-between bg-violet-50 hover:bg-violet-100 text-violet-700 px-5 py-4 rounded-2xl font-semibold text-sm transition-all border border-violet-100">
                        Bank Details
                        <Building2 size={15} />
                      </button>
                    </div>
                  </motion.div>

                  {/* API Overview */}
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                    className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
                    <h2 className="text-base font-bold text-gray-900 mb-1">API Overview</h2>
                    <p className="text-xs text-gray-400 mb-5">Your published APIs and monetization</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-5 border border-blue-100/50">
                        <p className="text-xs font-semibold text-blue-600 mb-2">Active APIs</p>
                        <p className="text-4xl font-black text-gray-900">{data.totalApis || 0}</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100/50">
                        <p className="text-xs font-semibold text-emerald-600 mb-2">Successful Payments</p>
                        <p className="text-4xl font-black text-gray-900">{data.successfulPayments || 0}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ─── MY APIS ─────────────────────────────────────────────── */}
              {activeTab === "apis" && (
                <motion.div key="apis" {...pageVariants} transition={{ duration: 0.25 }} className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">My APIs</h1>
                    <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full font-semibold">{filteredApis.length} APIs</span>
                  </div>
                  <SearchInput value={apiSearch} onChange={setApiSearch} placeholder="Search APIs by name or endpoint..." />
                  {loading ? (
                    <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
                  ) : filteredApis.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Code2 size={32} className="mx-auto mb-3 opacity-30" />
                      <p className="font-medium">No APIs found</p>
                    </div>
                  ) : (
                    filteredApis.map((api, i) => (
                      <motion.div
                        key={api._id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={`bg-white border rounded-3xl p-6 transition-all duration-200 ${
                          api.isActive
                            ? "border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50/50"
                            : "border-gray-100 opacity-60"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 className="font-bold text-gray-900">{api.name}</h3>
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${api.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                                {api.isActive ? "Active" : "Disabled"}
                              </span>
                              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{api.method || "GET"}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-mono mt-1.5 truncate">{api.endpoint}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {api.plans?.length > 0 ? api.plans.map(plan => (
                                <div key={plan._id} className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 hover:border-blue-200 transition-colors">
                                  <span className="font-bold text-gray-700">{plan.name}</span>
                                  <span className="text-gray-200">•</span>
                                  <span className="text-gray-400">{plan.requestLimit?.toLocaleString()} req</span>
                                  <span className="text-gray-200">•</span>
                                  <span className="text-blue-600 font-bold">₹{plan.price}</span>
                                  <button onClick={() => { setEditPlan(plan); setEditPlanForm(plan); }} className="ml-0.5 text-gray-300 hover:text-blue-500 transition-colors">
                                    <Pencil size={11} />
                                  </button>
                                </div>
                              )) : (
                                <span className="text-xs text-gray-300 italic">No plans yet — <button onClick={() => setActiveTab("createPlan")} className="text-blue-400 hover:text-blue-600 underline">add one</button></span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Base Price</p>
                              <span className="text-xl font-black text-gray-900">₹{api.price}</span>
                            </div>
                            <div className="h-8 w-px bg-gray-100" />
                            <button onClick={() => { setEditApi(api); setEditForm({ ...api }); }}
                              className="p-2.5 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                              <Settings size={17} />
                            </button>
                            <button
                              onClick={() => api.isActive ? setDisableTarget(api) : handleEnable(api._id)}
                              className={`p-2.5 rounded-xl transition-all font-bold text-xs ${
                                api.isActive
                                  ? "text-gray-300 hover:text-red-500 hover:bg-red-50"
                                  : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3"
                              }`}
                            >
                              {api.isActive ? <Trash2 size={17} /> : "ENABLE"}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}

              {/* ─── CREATE API ───────────────────────────────────────────── */}
              {activeTab === "createApi" && (
                <motion.div key="createApi" {...pageVariants} transition={{ duration: 0.25 }}
                  className="max-w-2xl bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900">Deploy New API</h2>
                    <p className="text-sm text-gray-400 mt-1">Register your API endpoint on the Flowra gateway</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">API Name *</label>
                      <input className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm transition-all" placeholder="My Awesome API" onChange={e => setApiForm({ ...apiForm, name: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">HTTP Method</label>
                      <div className="relative">
                        <select value={apiForm.method} className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none appearance-none text-sm focus:border-blue-300 transition-all pr-10" onChange={e => setApiForm({ ...apiForm, method: e.target.value })}>
                          <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Gateway URL</label>
                    <input type="text" placeholder="https://api.example.com/v1" className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none focus:border-blue-300 text-sm transition-all" onChange={e => setApiForm({ ...apiForm, externalUrl: e.target.value })} />
                  </div>

                  <div className="mt-5 space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Endpoint Slug *</label>
                    <input className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none focus:border-blue-300 text-sm transition-all font-mono" placeholder="/users/data" onChange={e => setApiForm({ ...apiForm, endpoint: e.target.value })} />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-5">
                   <div className="space-y-1.5">
  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
    Base Price (₹)
  </label>

  <input
    type="number"
    value={0}
    disabled
    className="w-full bg-gray-100 border border-gray-100 p-3.5 rounded-2xl outline-none text-sm text-gray-400 cursor-not-allowed"
    placeholder="0"
  />
</div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Free Tier Limit</label>
                      <input type="number" value={apiForm.freeLimit} className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none focus:border-blue-300 text-sm transition-all" onChange={e => setApiForm({ ...apiForm, freeLimit: Number(e.target.value) })} />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mr-1 self-center">Quick:</span>
                    {[{ l: "100 Free Req", a: () => setApiForm(f => ({ ...f, freeLimit: 100 })) }, { l: "₹99 Price", a: () => setApiForm(f => ({ ...f, price: 99 })) }, { l: "POST Method", a: () => setApiForm(f => ({ ...f, method: "POST" })) }].map((s, i) => (
                      <button key={i} onClick={s.a} className="text-xs px-3 py-1.5 rounded-full border border-blue-100 text-blue-500 bg-blue-50 hover:bg-blue-100 font-semibold transition-colors">{s.l}</button>
                    ))}
                  </div>

                  <button onClick={handleCreateAPI} disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold mt-8 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70">
                    {isSubmitting ? <><Loader2 size={17} className="animate-spin" /> Deploying...</> : <><Zap size={17} />Deploy to Gateway</>}
                  </button>
                </motion.div>
              )}

              {/* ─── CREATE PLAN ──────────────────────────────────────────── */}
              {activeTab === "createPlan" && (
                <motion.div key="createPlan" {...pageVariants} transition={{ duration: 0.25 }}
                  className="max-w-2xl bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900">Create Pricing Plan</h2>
                    <p className="text-sm text-gray-400 mt-1">Define a subscription tier for one of your APIs</p>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Target API</label>
                      <div className="relative">
                        <select className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none text-sm focus:border-violet-300 transition-all appearance-none pr-10" onChange={e => setPlanForm({ ...planForm, api: e.target.value })}>
                          <option value="">Choose an API</option>
                          {apis.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Plan Name</label>
                      <input value={planForm.name} placeholder="e.g. Pro Plan" className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none text-sm focus:border-violet-300 transition-all" onChange={e => setPlanForm({ ...planForm, name: e.target.value })} />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {planSuggestions.map(s => (
                          <button key={s} onClick={() => setPlanForm(f => ({ ...f, name: s }))} className="text-xs px-3 py-1.5 rounded-full border border-violet-100 text-violet-500 bg-violet-50 hover:bg-violet-100 font-semibold transition-colors">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Monthly Cost (₹)</label>
                        <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none text-sm focus:border-violet-300 transition-all" onChange={e => setPlanForm({ ...planForm, price: Number(e.target.value) })} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Requests / Month</label>
                        <input type="number" className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl outline-none text-sm focus:border-violet-300 transition-all" onChange={e => setPlanForm({ ...planForm, requestLimit: Number(e.target.value) })} />
                      </div>
                    </div>

                    <button onClick={handleCreatePlan} disabled={isSubmitting}
                      className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/10 mt-3 disabled:opacity-70">
                      {isSubmitting ? <><Loader2 size={17} className="animate-spin" /> Publishing...</> : <><Sparkles size={17} />Publish Pricing Tier</>}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── TRANSACTIONS ─────────────────────────────────────────── */}
              {activeTab === "transactions" && (
                <motion.div key="transactions" {...pageVariants} transition={{ duration: 0.25 }} className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
                      <p className="text-xs text-gray-400 mt-0.5">Customer purchases and your earnings</p>
                    </div>
                    {fetchingTransactions && <Loader2 size={18} className="animate-spin text-blue-400" />}
                  </div>

                  <SearchInput value={txSearch} onChange={setTxSearch} placeholder="Search by customer or plan name..." />

                  <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    {fetchingTransactions ? (
                      <div className="p-8 space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
                    ) : filteredTransactions.length === 0 ? (
                      <div className="text-center py-16 text-gray-400">
                        <Receipt size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="font-medium">{txSearch ? "No matching transactions" : "No transactions yet"}</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {filteredTransactions.map((t, i) => (
                          <motion.div key={t._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-600">
                                {t.user?.name?.[0] || "U"}
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-gray-900">{t.user?.name || "Unknown"}</p>
                                <p className="text-xs text-gray-400">{t.plan?.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-emerald-600">+₹{t.providerEarning}</p>
                              <p className="text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ─── WITHDRAWALS ──────────────────────────────────────────── */}
              {activeTab === "withdrawals" && (
                <motion.div key="withdrawals" {...pageVariants} transition={{ duration: 0.25 }} className="space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Withdrawals</h1>
                      <p className="text-xs text-gray-400 mt-0.5">Track your payout requests</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {fetchingWithdrawals && <Loader2 size={16} className="animate-spin text-blue-400" />}
                      <button onClick={() => {
                        if (!bankForm.accountNumber && !bankForm.upiId)
                          return addToast("Add bank details first", "Set up your payout details before requesting withdrawal", "warning");
                        setShowWithdrawConfirm(false);
                      }}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Withdraw card */}
                  <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
                    <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">Available Balance</p>
                    <p className="text-4xl font-black mb-5">₹{data.wallet?.pending || 0}</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={e => setWithdrawAmount(e.target.value)}
                        className="flex-1 bg-white/10 backdrop-blur border border-white/20 text-white placeholder-blue-200 p-3 rounded-xl text-sm outline-none focus:bg-white/20 transition-all"
                      />
                      <button onClick={handleWithdrawal}
                        className="bg-white text-blue-600 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-all text-sm flex items-center gap-2 shadow-lg">
                        <ArrowUpRight size={15} /> Withdraw
                      </button>
                    </div>
                  </div>

                  <SearchInput value={wdSearch} onChange={setWdSearch} placeholder="Filter by status or amount..." />

                  <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    {fetchingWithdrawals ? (
                      <div className="p-8 space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
                    ) : filteredWithdrawals.length === 0 ? (
                      <div className="text-center py-16 text-gray-400">
                        <Banknote size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="font-medium">{wdSearch ? "No matches found" : "No withdrawal requests yet"}</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {filteredWithdrawals.map((w, i) => (
                          <motion.div key={w._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                w.status === "approved" ? "bg-emerald-50" : w.status === "rejected" ? "bg-red-50" : "bg-amber-50"
                              }`}>
                                {w.status === "approved" ? <BadgeCheck size={16} className="text-emerald-500" />
                                  : w.status === "rejected" ? <XCircle size={16} className="text-red-500" />
                                  : <Clock size={16} className="text-amber-500" />}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">₹{w.amount}</p>
                                <p className="text-xs text-gray-400">{new Date(w.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                              w.status === "approved" ? "bg-emerald-50 text-emerald-600"
                                : w.status === "rejected" ? "bg-red-50 text-red-600"
                                : "bg-amber-50 text-amber-600"
                            }`}>
                              {w.status}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ─── BANK DETAILS ─────────────────────────────────────────── */}
              {activeTab === "bank" && (
                <motion.div key="bank" {...pageVariants} transition={{ duration: 0.25 }} className="max-w-2xl space-y-5">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Bank Details</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Secure payout information for withdrawals</p>
                  </div>

                  {/* Saved info card */}
                  {(bankForm.accountHolderName || bankForm.accountNumber) && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100 rounded-3xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center"><Building2 size={14} className="text-blue-500" /></div>
                        <p className="text-sm font-bold text-gray-700">Saved Payout Details</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { l: "Account Holder", v: bankForm.accountHolderName },
                          { l: "Account Number", v: bankForm.accountNumber ? (showAccountNumber ? bankForm.accountNumber : "•••• " + bankForm.accountNumber.slice(-4)) : null },
                          { l: "IFSC Code", v: bankForm.ifsc },
                          { l: "UPI ID", v: bankForm.upiId }
                        ].map((f, i) => (
                          <div key={i}>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{f.l}</p>
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-semibold text-gray-800">{f.v || <span className="text-gray-300 font-normal italic">Not added</span>}</p>
                              {i === 1 && bankForm.accountNumber && (
                                <button onClick={() => setShowAccountNumber(!showAccountNumber)} className="text-gray-300 hover:text-gray-500 transition-colors">
                                  {showAccountNumber ? <EyeOff size={12} /> : <Eye size={12} />}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Form */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm space-y-5">
                    <h2 className="text-base font-bold text-gray-900">Update Details</h2>
                    {[
                      { label: "Account Holder Name", key: "accountHolderName", placeholder: "John Doe", type: "text" },
                      { label: "Account Number", key: "accountNumber", placeholder: "0000 0000 0000", type: "text" },
                      { label: "IFSC Code", key: "ifsc", placeholder: "HDFC0001234", type: "text" },
                      { label: "UPI ID", key: "upiId", placeholder: "johndoe@upi", type: "text" }
                    ].map(f => (
                      <div key={f.key} className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={bankForm[f.key]}
                          onChange={e => setBankForm({ ...bankForm, [f.key]: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
                        />
                      </div>
                    ))}

                    <div className="pt-1 flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
                      <AlertCircle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 leading-relaxed">
                        Ensure your bank details are accurate. Incorrect information may delay or fail your withdrawal.
                      </p>
                    </div>

                    <button onClick={saveBankDetails} disabled={savingBank}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70 mt-2">
                      {savingBank ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><BadgeCheck size={16} /> Save Bank Details</>}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ─── Edit API Modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {editApi && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setEditApi(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-violet-500" />
              <div className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Update API Settings</h2>
                  <button onClick={() => setEditApi(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-xl"><X size={16} /></button>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "API Name", key: "name", placeholder: "API Name" },
                    { label: "Gateway URL", key: "externalUrl", placeholder: "https://..." },
                    { label: "Endpoint Path", key: "endpoint", placeholder: "/path", mono: true }
                  ].map(f => (
                    <div key={f.key} className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{f.label}</label>
                      <input value={editForm[f.key] || ""} onChange={e => setEditForm({ ...editForm, [f.key]: e.target.value })}
                        className={`w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:border-blue-300 transition-all ${f.mono ? "font-mono" : ""}`}
                        placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Method</label>
                    <div className="relative">
                      <select value={editForm.method || "GET"} onChange={e => setEditForm({ ...editForm, method: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none appearance-none pr-10 focus:border-blue-300 transition-all">
                        <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
                      </select>
                      <ChevronDown size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Price (₹)</label>
                    <input type="number" value={editForm.price || ""} onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:border-blue-300 transition-all" />
                  </div>
                </div>
                <div className="flex gap-3 mt-7">
                  <button onClick={() => setEditApi(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
                  <button onClick={handleUpdateAPI} disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                    {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Save Changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Edit Plan Modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {editPlan && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setEditPlan(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-pink-400" />
              <div className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Modify Pricing Tier</h2>
                  <button onClick={() => setEditPlan(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-xl"><X size={16} /></button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Plan Name</label>
                    <input value={editPlanForm.name || ""} onChange={e => setEditPlanForm({ ...editPlanForm, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:border-violet-300 transition-all" placeholder="Plan Name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Price (₹)</label>
                      <input type="number" value={editPlanForm.price || ""} onChange={e => setEditPlanForm({ ...editPlanForm, price: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:border-violet-300 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Request Limit</label>
                      <input type="number" value={editPlanForm.requestLimit || ""} onChange={e => setEditPlanForm({ ...editPlanForm, requestLimit: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-2xl text-sm outline-none focus:border-violet-300 transition-all" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-7">
                  <button onClick={() => setEditPlan(null)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
                  <button onClick={handleUpdatePlan} disabled={isUpdatingPlan}
                    className="flex-1 bg-violet-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-violet-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                    {isUpdatingPlan ? <><Loader2 size={14} className="animate-spin" /> Updating...</> : "Update Tier"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}