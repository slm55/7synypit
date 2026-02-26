import React, { useState } from 'react';
import { Search, GraduationCap, BookOpen, ClipboardList, User, ChevronRight, LayoutDashboard, LogOut, Video, Cpu, Code2, ExternalLink, Calendar, Bell, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_STUDENTS } from './data/mockData';
import { Student } from './types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const Header = ({ onLogout, studentName }: { onLogout: () => void, studentName?: string }) => (
  <header className="bg-white border-b border-zinc-200 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-emerald-600 p-2 rounded-lg">
          <GraduationCap className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-zinc-900 tracking-tight">IT Progress Portal</span>
      </div>
      {studentName && (
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-zinc-900">{studentName}</span>
            <span className="text-xs text-zinc-500">Ата-ана кабинеті</span>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  </header>
);

const StatCard = ({ title, value, icon: Icon, colorClass }: { title: string, value: string | number, icon: any, colorClass: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{title}</span>
      <div className={`${colorClass} p-2 rounded-xl bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="text-3xl font-bold text-zinc-900">{value}</div>
  </div>
);

const Dashboard = ({ student, onLogout }: { student: Student, onLogout: () => void }) => {
  const chartData = student.testResults.map(res => ({
    name: res.name.split(':')[0],
    score: (res.score / res.maxScore) * 100,
    actual: `${res.score}/${res.maxScore}`
  }));

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header onLogout={onLogout} studentName={student.name} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a 
            href={student.externalResourcesUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Оқу материалдары</p>
                <p className="text-emerald-100 text-xs">Презентациялар, үй жұмыстары</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
          
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatCard 
            title="Аралық бақылау бағасы" 
            value={student.midtermProject.grade} 
            icon={LayoutDashboard} 
            colorClass="bg-emerald-500" 
          />
          <StatCard 
            title="Сынып" 
            value={student.grade} 
            icon={BookOpen} 
            colorClass="bg-purple-500" 
          />
        </motion.div>

        {/* Midterm Project Showcase */}
        <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">
                <LayoutDashboard className="w-4 h-4" />
                Тоқсандық жоба
              </div>
              <h2 className="text-4xl font-black text-zinc-900 mb-4">{student.midtermProject.title}</h2>
              <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                {student.midtermProject.description}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Құралдар мен технологиялар
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {student.midtermProject.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-lg text-sm font-medium border border-zinc-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-700 font-bold text-sm">Мұғалімнің бағалауы</span>
                    <span className="text-2xl font-black text-emerald-600">{student.midtermProject.grade}</span>
                  </div>
                  <p className="text-emerald-800 text-sm italic leading-relaxed">
                    "{student.midtermProject.feedback}"
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900 flex items-center justify-center relative min-h-[400px]">
              {student.midtermProject.videoUrl ? (
                <video 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  controls
                  poster={student.midtermProject.imageUrl}
                >
                  <source src={student.midtermProject.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-zinc-500 flex flex-col items-center gap-4">
                  <Video className="w-16 h-16 opacity-20" />
                  <span className="text-sm font-medium">Project Demo Video</span>
                </div>
              )}
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                Жлба видеосы
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Progress & Syllabus */}
          <div className="lg:col-span-2 space-y-8">
            {/* Test Results Chart */}
            <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                Бақылау нәтижелері (%)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border border-zinc-200 shadow-lg rounded-lg">
                              <p className="text-sm font-medium text-zinc-900">{payload[0].payload.name}</p>
                              <p className="text-xs text-emerald-600 font-bold">Score: {payload[0].payload.actual}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.score > 80 ? '#10b981' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Syllabus Progress */}
            <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                Тоқсандық оқу жоспары
              </h3>
              <div className="space-y-4">
                {student.syllabus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100">
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                      item.status === 'Completed' ? 'bg-emerald-500' : 
                      item.status === 'Current' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-300'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-zinc-900">{item.topic}</h4>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                          item.status === 'Current' ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {item.status == 'Completed' ? 'Аяқталған' : item.status === 'Current' ? 'Ағымдағы' : 'Келесі'}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Announcements & Deadlines */}
          <div className="space-y-8">

            {/* Teacher's Feedback */}
            <section className="bg-emerald-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Code2 className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Иұғалімнің пікірі
              </h3>
              <p className="text-emerald-50 text-lg leading-relaxed italic mb-8">
                "{student.feedback}"
              </p>
              <div className="mt-auto pt-8 border-t border-emerald-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center font-bold text-lg">
                  IT
                </div>
                <div>
                  <p className="font-bold">Mr. Ислам</p>
                  <p className="text-sm text-emerald-400">IT Dept.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: (student: Student) => void }) => {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    if (student) {
      onLogin(student);
    } else {
      setError('Please select a student from the list');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Header onLogout={() => {}} />
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-2xl max-w-md w-full"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mb-6">
              <GraduationCap className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-zinc-900">Ата-ана порталы</h2>
            <p className="text-zinc-500 mt-2">Балаңызды тізімнен таңдаңыз</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Оқущы аты-жөні</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                <select 
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-10 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all appearance-none font-medium text-zinc-900 cursor-pointer"
                >
                  <option value="">Оқушы таңдау</option>
                  {MOCK_STUDENTS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-zinc-400 rotate-90" />
                </div>
              </div>
              {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 group"
            >
              Жалғастыру
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-zinc-100">
            <div className="flex items-center justify-center gap-4 opacity-30 grayscale">
              <div className="w-8 h-8 bg-zinc-200 rounded-lg" />
              <div className="w-8 h-8 bg-zinc-200 rounded-lg" />
              <div className="w-8 h-8 bg-zinc-200 rounded-lg" />
            </div>
            <p className="text-[10px] text-zinc-400 text-center uppercase tracking-[0.2em] font-black mt-6">
              Amjilt Cyber School • IT Dept
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  return (
    <div className="font-sans antialiased text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <AnimatePresence mode="wait">
        {currentStudent ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard 
              student={currentStudent} 
              onLogout={() => setCurrentStudent(null)} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Login onLogin={setCurrentStudent} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
