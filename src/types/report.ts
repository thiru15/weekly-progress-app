export interface Report {
    startDate: Date;
    weekStatus: string;
    billableWork: string;
    anyIssues?: string;
    issueDetail: string;
    opportunities: string;
    internalProject: string;
    employeeName: string;
    employeeEmail: string;
    project: string;
    projectManager: string;
    dbssManager: string;
    accountManager: string;
    followUp: boolean;
    followUpIssues: string;
    followUpOpportunities: string;
}

export class Report implements Report {
    constructor() {
        this.startDate = new Date();
        this.weekStatus = "";
        this.billableWork = "";
        this.anyIssues = "";
        this.issueDetail = "";
        this.opportunities = "";
        this.internalProject = "";
        this.employeeName = "";
        this.employeeEmail = "";
        this.project = "";
        this.projectManager = "";
        this.dbssManager = "";
        this.accountManager = "";
        this.followUp = false;;
        this.followUpIssues = "";
        this.followUpOpportunities = "";
    }
}
