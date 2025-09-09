import DeploymentDetailsClient from "@/components/dashboard/deployments/DeploymentPage";

interface PageProps {
  searchParams: { id?: string }; // ✅ use query param, not path param
}

export default async function Page({ searchParams }: PageProps) {
  const { id: deploymentId } = await searchParams; // 👈 await here

if (!deploymentId) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-lg text-gray-500">No deployment has been selected</p>
    </div>
  );
}


  return <DeploymentDetailsClient deploymentId={deploymentId} />;
}