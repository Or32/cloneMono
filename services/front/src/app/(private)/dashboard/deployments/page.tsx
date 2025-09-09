import DeploymentDetailsClient from "@/components/dashboard/deployments/DeploymentPage";


export default async function PageTest({ searchParams }: any) {
  const { id: deploymentId } = searchParams; // 👈 await here

if (!deploymentId) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-lg text-gray-500">No deployment has been selected</p>
    </div>
  );
}


  return <DeploymentDetailsClient deploymentId={deploymentId} />;
}