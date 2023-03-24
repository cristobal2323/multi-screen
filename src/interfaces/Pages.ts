export interface IPages {
    page: Page[];
}

interface Page {
    path:          string;
    openInMonitor: number;
    feature:       Feature;
}

interface Feature {
    width:      string;
    heigth:     string;
    menubar:    string;
    toolbar:    string;
    location:   string;
    status:     string;
    resizable:  string;
    scrollbars: string;
}
