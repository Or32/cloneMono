import { authService } from "../../../core/auth/authService.js";
import { PrintAlreadyAuthenticated } from "../../../core/messages.js";

export function CheckExistingAuth() {
    if (!authService.isAuthenticated()) {
        return null
    }

    const { user, activeTeam } = authService.getSession();

    PrintAlreadyAuthenticated(user.name, activeTeam.name);

    return { user, activeTeam };


}
