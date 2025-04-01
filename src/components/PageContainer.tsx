import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import Home from '../views/Main/Home';
import Materials from '../views/Main/Materials';
import Blogs from '../views/Main/Blogs';

function TabContent() {
  const navigate = useNavigate();
  const { tabValue } = useParams(); // Get the current tab value from the URL

  return (
    <Tabs
      value={tabValue || 'first'} // Default to 'first' if tabValue is undefined
      onChange={(value) => navigate(`/tabs/${value}`)} // Update the URL when tab changes
    >
      <Tabs.List>
        <Tabs.Tab value="home">Home</Tabs.Tab>
        <Tabs.Tab value="materials">Materials</Tabs.Tab>
        <Tabs.Tab value="blogs">Blogs</Tabs.Tab>
        <Tabs.Tab value="forum">Forum</Tabs.Tab>
      </Tabs.List>
      {tabValue === 'home' && <Home />}{' '}
      {tabValue === 'materials' && <Materials />}{' '}
      {tabValue === 'blogs' && <Blogs />}{' '}
    </Tabs>
  );
}

export default TabContent;
