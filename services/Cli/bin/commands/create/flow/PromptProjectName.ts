import inquirer from "inquirer";

export async function PromptProjectName(): Promise<string> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
      validate: (input: string) =>
        /^[a-zA-Z0-9-_]+$/.test(input)
          ? true
          : "Use only letters, numbers, hyphens, and underscores.",
    },
  ]);
  
  return answers.projectName;
}