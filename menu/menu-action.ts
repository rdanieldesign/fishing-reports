import { PromptService } from "../prompt-service";
import { MenuItems } from "./menu-enum";

export class MenuAction extends PromptService {

  getMenuSelection() {
    return this.sendPrompt({
      type: 'select',
      name: 'selection',
      message: 'What do you want to do?',
      choices: [
        { title: 'Manage Locations', value: MenuItems.locations },
        { title: 'Manage Reports', value: MenuItems.reports },
      ],
    });
  }

}