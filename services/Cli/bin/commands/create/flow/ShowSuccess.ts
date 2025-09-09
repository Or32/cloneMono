export function ShowSuccess(projectName: string): void {
  console.log(`✅ Project "${projectName}" created!`);
  console.log("👉 Next steps:");
  console.log(`  cd ${projectName}`);
  console.log(`  npm run dev`);
}
