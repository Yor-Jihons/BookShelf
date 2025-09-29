export interface IInterprocessCommunication {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initI18nData: ( resources: any ) => void;
  getSystemLocale: () => Promise<string>;
  node: () => string;
  chrome: () => string;
  electron: () => string;
  showMessageBox: ( message: string, buttons: string[] ) => Promise<number>; // Returns index of the button which the user selected.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUsers: () => Promise<any[]>;
  addUser: (name: string, email: string) => Promise<{ success: boolean, changes?: number, error?: string }>;
}

declare global {
  interface Window {
    interprocessCommunication: IInterprocessCommunication;
  }
}
