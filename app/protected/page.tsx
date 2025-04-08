'use client'
import { Grid, Box } from '@mui/material';

import Blog from './(DashboardLayout)/components/dashboard/Blog';
import PageContainer from './(DashboardLayout)/components/container/PageContainer';
// components



const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          
          
        <Blog />
          
          
          
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;


/*import { auth, signOut } from 'app/auth';

export default async function ProtectedPage() {
  let session = await auth();

  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
        You are logged in as {session?.user?.email}
        <SignOut />
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
*/