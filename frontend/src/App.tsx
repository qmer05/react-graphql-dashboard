import { Routes, Route } from 'react-router-dom';
import CampaignList from './pages/CampaignList';
import CampaignDetail from './pages/CampaignDetail';


function App() {
  return (
    <Routes>
      <Route path="/" element={<CampaignList />} />
      <Route path="/campaign/:id" element={<CampaignDetail />} />
    </Routes>
  )
}

export default App