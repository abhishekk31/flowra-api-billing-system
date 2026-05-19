import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Code2, PlusCircle, CreditCard,
  LogOut, Trash2, Settings, ChevronRight, Menu, X, CheckCircle2, AlertCircle, Loader2, Pencil,
  ShieldOff, Sparkles, Zap
} from "lucide-react";

// ─── Gemini-style Modal ────────────────────────────────────────────────────
function GeminiModal({ open, onClose, title, description, icon, confirmLabel = "Confirm", confirmClass = "bg-blue-600 hover:bg-blue-700 text-white", onConfirm, loading = false, children }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="p-7">
              {icon && (
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 mx-auto mb-5">
                  {icon}
                </div>
              )}
              <h2 className="text-[17px] font-semibold text-gray-900 text-center mb-2">{title}</h2>
              {description && <p className="text-sm text-gray-500 text-center leading-relaxed mb-1">{description}</p>}
              {children && <div className="mt-4">{children}</div>}
              <div className="flex gap-3 mt-7">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${confirmClass}`}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SuggestionChip({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors font-medium"
    >
      {label}
    </button>
  );
}

export default function ProviderDashboard() {
  const [data, setData] = useState({ totalApis: 0, totalSubscribers: 0, totalEarnings: 0 });
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editApi, setEditApi] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editPlan, setEditPlan] = useState(null);
  const [editPlanForm, setEditPlanForm] = useState({});
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const [disableTarget, setDisableTarget] = useState(null);
  const [isDisabling, setIsDisabling] = useState(false);
  const [showCreateApiSuccess, setShowCreateApiSuccess] = useState(false);
  const [showCreatePlanSuccess, setShowCreatePlanSuccess] = useState(false);
  const [showCreateApiConfirm, setShowCreateApiConfirm] = useState(false);
  const [showCreatePlanConfirm, setShowCreatePlanConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const [apiForm, setApiForm] = useState({
    name: "", description: "", endpoint: "", externalUrl: "", method: "GET", price: 0, freeLimit: 0
  });

  const [planForm, setPlanForm] = useState({
    api: "", name: "", price: "", requestLimit: "", duration: 30
  });

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  const fetchData = async () => {
    try {
      const dash = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/provider`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(await dash.json());

      const apiRes = await fetch(`${import.meta.env.VITE_API_URL}/provider/apis`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const apiData = await apiRes.json();
      setApis(apiData.apis || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      showNotification("Failed to connect to server", "error");
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleCreateAPI = async () => {
    if (!apiForm.name || !apiForm.endpoint) return showNotification("Name and Endpoint are required", "error");
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
      if (res.ok) {
        setShowCreateApiConfirm(false);
        setShowCreateApiSuccess(true);
        fetchData();
      } else {
        showNotification("Failed to create API", "error");
        setShowCreateApiConfirm(false);
      }
    } catch {
      showNotification("Server error", "error");
      setShowCreateApiConfirm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreatePlan = async () => {
    if (!planForm.api || !planForm.name)
      return showNotification("Please select an API and Plan Name", "error");
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
      const data = await res.json();
      if (res.ok) {
        setShowCreatePlanConfirm(false);
        setShowCreatePlanSuccess(true);
        await fetchData();
      } else {
        showNotification(data.message || "Failed to create plan", "error");
        setShowCreatePlanConfirm(false);
      }
    } catch {
      showNotification("Server error", "error");
      setShowCreatePlanConfirm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAPI = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/updateApi/${editApi._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (!data.api) { showNotification("Update failed", "error"); return; }
      await fetchData();
      setEditApi(null);
      showNotification("API Updated");
    } catch {
      showNotification("Update failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (api) => {
    setDisableTarget(api);
  };

  const confirmDisable = async () => {
    if (!disableTarget) return;
    setIsDisabling(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Inactiveapi/${disableTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) {
        showNotification(data.message || "Failed to disable API", "error");
        return;
      }
      setApis(prev => prev.map(api => api._id === disableTarget._id ? { ...api, isActive: false } : api));
      showNotification("API Disabled Successfully");
    } catch {
      showNotification("Something went wrong", "error");
    } finally {
      setIsDisabling(false);
      setDisableTarget(null);
    }
  };

  const handleEnable = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Activeapi/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) { showNotification("Failed to enable API", "error"); return; }
      setApis(prev => prev.map(api => api._id === id ? { ...api, isActive: true } : api));
      showNotification("API Enabled");
    } catch {
      showNotification("Error", "error");
    }
  };

  const handleUpdatePlan = async () => {
    try {
      setIsUpdatingPlan(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/plan/${editPlan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editPlanForm)
      });
      const data = await res.json();
      if (!res.ok) { showNotification(data.message || "Update failed", "error"); return; }
      await fetchData();
      setEditPlan(null);
      showNotification("Plan updated");
    } catch {
      showNotification("Error updating plan", "error");
    } finally {
      setIsUpdatingPlan(false);
    }
  };

  const planSuggestions = ["Starter", "Professional", "Business", "Enterprise", "Free Trial", "Growth"];
  const apiSuggestions = [
    { label: "Add description", action: () => document.querySelector('[data-field="desc"]')?.focus() },
    { label: "Set free limit to 100", action: () => setApiForm(f => ({ ...f, freeLimit: 100 })) },
    { label: "Try POST method", action: () => setApiForm(f => ({ ...f, method: "POST" })) },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1f1f1f] font-sans overflow-hidden">
      
      {/* ─── Toast ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[100] flex items-center gap-3 bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-2xl min-w-[320px]"
          >
            {toast.type === "success" ? <CheckCircle2 className="text-emerald-500" /> : <AlertCircle className="text-red-500" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <GeminiModal
        open={!!disableTarget}
        onClose={() => setDisableTarget(null)}
        title="Disable this API?"
        description={`"${disableTarget?.name}" will be marked inactive. Existing subscribers will lose access until you re-enable it.`}
        icon={<ShieldOff size={26} className="text-red-500" />}
        confirmLabel="Yes, disable"
        confirmClass="bg-red-500 hover:bg-red-600 text-white"
        onConfirm={confirmDisable}
        loading={isDisabling}
      />

      <GeminiModal
        open={showCreateApiConfirm}
        onClose={() => setShowCreateApiConfirm(false)}
        title="Ready to deploy?"
        description="By publishing this API you agree to Flowra's Provider Terms — you're responsible for uptime, rate limits, and accurate pricing."
        icon={<Zap size={26} className="text-blue-500" />}
        confirmLabel="Deploy API"
        confirmClass="bg-blue-600 hover:bg-blue-700 text-white"
        onConfirm={confirmCreateAPI}
        loading={isSubmitting}
      >
        <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 leading-relaxed">
          <span className="font-semibold text-gray-600 block mb-1">Quick suggestions</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {apiSuggestions.map((s, i) => (
              <button key={i} onClick={() => { s.action(); setShowCreateApiConfirm(false); }}
                className="px-3 py-1 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 text-xs font-medium transition-colors">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </GeminiModal>

      <GeminiModal
        open={showCreateApiSuccess}
        onClose={() => { setShowCreateApiSuccess(false); setActiveTab("apis"); }}
        title="API deployed!"
        description="Your API is now live on Flowra. Head to My APIs to create a pricing plan for it."
        icon={<CheckCircle2 size={28} className="text-emerald-500" />}
        confirmLabel="View My APIs"
        confirmClass="bg-emerald-500 hover:bg-emerald-600 text-white"
        onConfirm={() => { setShowCreateApiSuccess(false); setActiveTab("apis"); }}
      />

      <GeminiModal
        open={showCreatePlanConfirm}
        onClose={() => setShowCreatePlanConfirm(false)}
        title="Save this pricing plan?"
        description="Subscribers will see this plan immediately after it's published. You can edit pricing later from My APIs."
        icon={<CreditCard size={26} className="text-purple-500" />}
        confirmLabel="Save plan"
        confirmClass="bg-[#1f1f1f] hover:bg-black text-white"
        onConfirm={confirmCreatePlan}
        loading={isSubmitting}
      >
        <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3">
          <span className="font-semibold text-gray-600 block mb-2">Suggested tier names</span>
          <div className="flex flex-wrap gap-2">
            {planSuggestions.map(s => (
              <button key={s} onClick={() => { setPlanForm(f => ({ ...f, name: s })); setShowCreatePlanConfirm(false); }}
                className="px-3 py-1 rounded-full border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 text-xs font-medium transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </GeminiModal>

      <GeminiModal
        open={showCreatePlanSuccess}
        onClose={() => { setShowCreatePlanSuccess(false); setActiveTab("apis"); }}
        title="Plan created!"
        description="Your pricing plan is now live. Subscribers can see and purchase it right away."
        icon={<Sparkles size={28} className="text-purple-500" />}
        confirmLabel="View My APIs"
        confirmClass="bg-purple-600 hover:bg-purple-700 text-white"
        onConfirm={() => { setShowCreatePlanSuccess(false); setActiveTab("apis"); }}
      />

      {/* ─── SIDEBAR (FIXED STYLE) ─────────────────────────────────── */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <div className="flex items-center gap-3">
             <motion.div 
               animate={{ 
                 scale: [1, 1.15, 1],
                 rotate: [0, 5, -5, 0]
               }}
               transition={{ duration: 4, repeat: Infinity }}
               className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100"
             >
               <Sparkles size={16} className="text-white" />
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
             >
               Flowra
             </motion.h2>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute top-6 right-4 text-gray-400"><X size={20} /></button>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
            { id: "apis", label: "My APIs", icon: <Code2 size={18} /> },
            { id: "createApi", label: "Create API", icon: <PlusCircle size={18} /> },
            { id: "createPlan", label: "Create Plan", icon: <CreditCard size={18} /> }
          ].map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${activeTab === item.id ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {/* LOGOUT BUTTON IN SIDEBAR */}
        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </div>

      {/* ─── MAIN CONTENT (SCROLLABLE) ─────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Menu size={20} /></button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Provider</span> <ChevronRight size={12} className="text-gray-300" /> <span className="text-blue-600">{activeTab}</span>
            </div>
          </div>
          {/* API KEY BUTTON REMOVED AS REQUESTED */}
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8">
          <div className="max-w-5xl mx-auto pb-20">
            <AnimatePresence mode="wait">

              {activeTab === "dashboard" && (
                <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[{ label: "Active APIs", val: data.totalApis }, { label: "Subscribers", val: data.totalSubscribers }, { label: "Earnings", val: `₹${data.totalEarnings}` }].map((s, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-7 rounded-[24px] shadow-sm hover:shadow-md transition-all group">
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-3 group-hover:text-blue-500 transition-colors">{s.label}</p>
                      <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{s.val}</h2>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "apis" && (
                <motion.div key="apis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {apis.map((api) => (
                    <div key={api._id} className={`bg-white border border-gray-200 p-6 rounded-[24px] flex flex-col sm:flex-row items-center justify-between group transition-all ${!api.isActive ? "opacity-60" : "hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50"}`}>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-gray-900 text-lg">{api.name}</h3>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${api.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                            {api.isActive ? "Active" : "Disabled"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono mt-1">{api.endpoint}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {api.plans?.length > 0 ? api.plans.map(plan => (
                            <div key={plan._id} className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                              <span className="font-bold text-gray-700">{plan.name}</span>
                              <span className="text-gray-300">|</span>
                              <span className="text-gray-500">{plan.requestLimit} req</span>
                              <span className="text-gray-300">|</span>
                              <span className="text-blue-600 font-semibold">₹{plan.price}</span>
                              <button onClick={() => { setEditPlan(plan); setEditPlanForm(plan); }} className="ml-1 text-gray-400 hover:text-blue-600 transition-colors">
                                <Pencil size={12} />
                              </button>
                            </div>
                          )) : <span className="text-xs text-gray-400 italic">No pricing plans yet</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mt-6 sm:mt-0">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Base Price</p>
                          <span className="text-xl font-bold text-gray-900">₹{api.price}</span>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-100" />
                        <button onClick={() => { setEditApi(api); setEditForm(api); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Settings size={20} /></button>
                        <button
                          onClick={() => api.isActive ? handleDelete(api) : handleEnable(api._id)}
                          className={`p-2 transition-all rounded-lg ${api.isActive ? "text-gray-400 hover:text-red-500 hover:bg-red-50" : "text-emerald-600 hover:bg-emerald-50 text-xs font-bold"}`}
                        >
                          {api.isActive ? <Trash2 size={20} /> : "ENABLE"}
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "createApi" && (
                <motion.div key="createApi" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl bg-white border border-gray-200 p-8 rounded-[32px] shadow-sm">
                  <h2 className="text-2xl font-bold mb-8 tracking-tight">Deploy New API</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">API Name</label>
                      <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" placeholder="My Awesome API" onChange={e => setApiForm({ ...apiForm, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Method</label>
                      <select value={apiForm.method} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none appearance-none" onChange={e => setApiForm({ ...apiForm, method: e.target.value })}>
                        <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Gateway URL</label>
                    <input type="text" placeholder="https://api.example.com/v1" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all" onChange={e => setApiForm({ ...apiForm, externalUrl: e.target.value })} />
                  </div>
                  <div className="mt-6 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Slug Path</label>
                    <input className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" placeholder="/users/data" onChange={e => setApiForm({ ...apiForm, endpoint: e.target.value })} />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Base Price (₹)</label>
                      <input type="number" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" onChange={e => setApiForm({ ...apiForm, price: Number(e.target.value) })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Free Tier Limit</label>
                      <input type="number" value={apiForm.freeLimit} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" onChange={e => setApiForm({ ...apiForm, freeLimit: Number(e.target.value) })} />
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mr-2">Quick Presets:</span>
                    <SuggestionChip label="100 Free Req" onClick={() => setApiForm(f => ({ ...f, freeLimit: 100 }))} />
                    <SuggestionChip label="₹99 Starter" onClick={() => setApiForm(f => ({ ...f, price: 99 }))} />
                  </div>
                  <button onClick={handleCreateAPI} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-[20px] font-bold mt-10 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Deploy to Gateway"}
                  </button>
                </motion.div>
              )}

              {activeTab === "createPlan" && (
                <motion.div key="createPlan" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl bg-white border border-gray-200 p-8 rounded-[32px] shadow-sm">
                  <h2 className="text-2xl font-bold mb-8 tracking-tight">Create Tier</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Target API</label>
                      <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" onChange={e => setPlanForm({ ...planForm, api: e.target.value })}>
                        <option value="">Choose an API</option>
                        {apis.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tier Name</label>
                      <input value={planForm.name} placeholder="e.g. Pro Plan" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" onChange={e => setPlanForm({ ...planForm, name: e.target.value })} />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {planSuggestions.map(s => (
                          <SuggestionChip key={s} label={s} onClick={() => setPlanForm(f => ({ ...f, name: s }))} />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Monthly Cost (₹)</label>
                        <input type="number" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" onChange={e => setPlanForm({ ...planForm, price: Number(e.target.value) })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Requests/Month</label>
                        <input type="number" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" onChange={e => setPlanForm({ ...planForm, requestLimit: Number(e.target.value) })} />
                      </div>
                    </div>
                    <button onClick={handleCreatePlan} disabled={isSubmitting} className="w-full bg-[#1f1f1f] text-white py-4 rounded-[20px] font-bold mt-10 hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-900/10">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Publish Pricing Tier"}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ─── Edit API Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {editApi && (
          <motion.div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Update Settings</h2>
              <div className="space-y-4">
                <input value={editForm.name || ""} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-500" placeholder="API Name" />
                <input value={editForm.externalUrl || ""} onChange={e => setEditForm({ ...editForm, externalUrl: e.target.value })} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-500" placeholder="Gateway URL" />
                <select value={editForm.method || "GET"} onChange={e => setEditForm({ ...editForm, method: e.target.value })} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none">
                  <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
                </select>
                <input value={editForm.endpoint || ""} onChange={e => setEditForm({ ...editForm, endpoint: e.target.value })} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" placeholder="Endpoint Path" />
                <input type="number" value={editForm.price || ""} onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl outline-none" placeholder="Price" />
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setEditApi(null)} className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                <button onClick={handleUpdateAPI} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20">{isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Save Changes"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Edit Plan Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {editPlan && (
          <motion.div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-[32px] w-full max-w-md shadow-2xl border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Modify Pricing</h2>
              <div className="space-y-4">
                <input value={editPlanForm.name || ""} onChange={e => setEditPlanForm({ ...editPlanForm, name: e.target.value })} className="w-full bg-gray-50 border p-4 rounded-2xl outline-none" placeholder="Plan Name" />
                <input type="number" value={editPlanForm.price || ""} onChange={e => setEditPlanForm({ ...editPlanForm, price: Number(e.target.value) })} className="w-full bg-gray-50 border p-4 rounded-2xl outline-none" placeholder="Price" />
                <input type="number" value={editPlanForm.requestLimit || ""} onChange={e => setEditPlanForm({ ...editPlanForm, requestLimit: Number(e.target.value) })} className="w-full bg-gray-50 border p-4 rounded-2xl outline-none" placeholder="Request Limit" />
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setEditPlan(null)} className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                <button onClick={handleUpdatePlan} disabled={isUpdatingPlan} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center">
                  {isUpdatingPlan ? <Loader2 className="animate-spin w-5 h-5" /> : "Update Tier"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}