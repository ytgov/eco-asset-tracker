

export interface Employee {
    employee_id?: number;
    first_name: string;
    last_name: string;
    ynet_id: string;
    email: string;
    title?: string;
    department?: string;

    updated_by?: string;

    // used in DTO only
    display_name?: string;
}

export const emptyEmployee: Employee = {

    first_name: "",
    last_name: "",
    ynet_id: "",
    email: "",
    display_name: "",
    title: "",
    updated_by: "",
    department:""
}