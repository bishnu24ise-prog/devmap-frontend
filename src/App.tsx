import React from 'react';
import { useStore } from './store/useStore';
import { useStatusPolling, useRepoResults } from './hooks/useAnalyze';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { CityScene } from './components/CityScene';
import { BuildingPanel } from './components/BuildingPanel';
import { DebtDashboard } from './components/Dashboard';
import { MonacoView } from './components/MonacoView';
import { AlertCircle } from 'lucide-react';
import { Button } from './components/ui/Button';

export const App: React.FC = () => {
  const analysisStatus = useStore((state) => state.analysisStatus);
  const activeTab = useStore((state) => state.activeTab);
  const resetStore = useStore((state) => state.resetStore);
  useStatusPolling();
  useRepoResults();

  if (analysisStatus === 'idle') return <LandingPage />;
  if (analysisStatus === 'loading') return <LoadingScreen />;
  if (analysisStatus === 'error') {
    return (
      <div style={{minHeight:'100vh',background:'#020617',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',textAlign:'center'}}>
        <AlertCircle style={{color:'#f43f5e',width:40,height:40}} />
        <h2 style={{color:'white',marginTop:16,fontFamily:'Outfit,sans-serif'}}>Analysis Pipeline Failure</h2>
        <p style={{color:'#94a3b8',fontSize:14,maxWidth:400,marginTop:8}}>The remote server failed to establish an AST branch for the requested package.</p>
        <Button variant="glow" onClick={resetStore} className="mt-4">Return to Input Landing</Button>
      </div>
    );
  }
  return (
    <div style={{width:'100%',minHeight:'100vh',background:'#020617',display:'flex',flexDirection:'column',color:'white'}}>
      <Header />
      <main style={{flex:1,display:'flex',position:'relative',height:'calc(100vh - 80px)'}}>
        {activeTab === 'city' && (
          <div style={{flex:1,display:'flex',position:'relative',overflow:'hidden'}}>
            <div style={{flex:1,height:'100%',position:'relative'}}><CityScene /></div>
            <BuildingPanel />
          </div>
        )}
        {activeTab === 'dashboard' && (
          <div style={{flex:1,overflowY:'auto'}}><DebtDashboard /></div>
        )}
        {activeTab === 'refactor' && (
          <div style={{flex:1,overflowY:'auto'}}><MonacoView /></div>
        )}
      </main>
    </div>
  );
};
export default App;