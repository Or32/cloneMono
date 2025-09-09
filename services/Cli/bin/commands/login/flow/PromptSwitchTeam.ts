import inquirer from "inquirer";

export async function PromptSwitchTeam(): Promise<boolean> {
  const { switchTeam } = await inquirer.prompt([
    {
      type: "confirm",
      name: "switchTeam",
      message: "Do you want to switch team?",
      default: false,
    },
  ]);
  
  return switchTeam;
}
