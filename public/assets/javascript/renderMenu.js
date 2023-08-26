window.addEventListener('DOMContentLoaded', () => {
    let menus_list = [
        {
            'name':'Dashboard',
            'component':'DashboardComponent',
            'icon':'dashboard.png'
        },
        {
            'name':'Registration',
            'component':'RegistrationComponent',
            'icon':'registration.png'
        },
        {
            'name':'Manage Department',
            'icon':'department.png',
            'sub_menu':[
                {
                    'name':'Department',
                    'component':'DepartmentComponent',
                    'icon':'department.png'
                },
                {
                    'name':'Class',
                    'component':'LevelComponent',
                    'icon':'level.png'
                },
                {
                    'name':'Main Program',
                    'component':'MainProgramComponent',
                    'icon':'main_programs.png'
                },
                {
                    'name':'Group Level',
                    'component':'GroupLevelComponent',
                    'icon':'group_level.png'
                }
            ]
        },
        {
            'name':'Class Management',
            'icon':'class_management.png',
            'sub_menu':[
                {
                    'name':'Assign Program',
                    'component':'AssignProgramComponent',
                    'icon':'assign_program.png'
                },
                {
                    'name':'Assign Level',
                    'component':'AssignLevelComponent',
                    'icon':'assign_class.png'
                }
            ]
        },
        {
            'name':'Services',
            'component':'ServicesComponent',
            'icon':'service.png'
        },
        {
            'name':'Books',
            'component':'BookComponent',
            'icon':'book.png'
        },
        {
            'name':'Payment Processing',
            'icon':'payment_processing.png',
            'sub_menu':[
                {
                    'name':'Invoices',
                    'component':'InvoicesComponent',
                    'icon':'invoice.png'
                },
                {
                    'name':'Receipt',
                    'component':'ReceiptComponent',
                    'icon':'receipt.png'
                }
            ]
        },
        {
            'name':'Certificate',
            'component':'CertificateComponent',
            'icon':'certificate.png'
        },
        {
            'name':'Uniform',
            'icon':'uniform.png',
            'sub_menu':[
                {
                    "name":"Students",
                    "component":"UniformStudentComponent",
                    "icon":"student_uniform.png"
                },
                {
                    "name":"Teacher",
                    "component":"UniformTeacherComponent",
                    "icon":"teacher_uniform.png"
                }
            ]
        },
        {
            'name':'Score',
            'component':'ScoreComponent',
            'icon':'score.png'
        },
        {
            'name':'Attendance',
            'icon':'attendance.png',
            'sub_menu': [
                {
                    "name":"Teacher",
                    "component":"TeacherAttendanceComponent",
                    "icon":"teacher_list.png"
                },
                {
                    "name":"Student",
                    "component":"StudentAttendanceComponent",
                    "icon":"student_list.png"
                }
            ]
        },
        {
            'name':'Student List',
            'component':'StudentListComponent',
            'icon':'student_list.png'
        },
        {
            'name':'Teacher List',
            'component':'TeacherListComponent',
            'icon':'teacher_list.png'
        },
        {
            'name':'Job Opportunity',
            'component':'JobOpportunityComponent',
            'icon':'job_opportunity.png'
        },
        {
            'name':'Branch and Location',
            'component':'BranchAndLocationComponent',
            'icon':'branch_and_location.png'
        },
        {
            'name':'User Management',
            'icon':'user_management.png',
            'sub_menu':[
                {
                    "name":"Manage Role",
                    "component":"Management Role",
                    "icon":"role_management.png"
                },
                {
                    "name":"Manage User",
                    "component":"Management User",
                    "icon":"user_management.png"
                }
            ]
        },
        {
            'name':'Mobile Setting',
            'component':'MobileSettingsComponent',
            'icon':'mobile_setting.png'
        },
        {
            'name':'Settings',
            'icon':'settings.png',
            'sub_menu':[
                {
                    'name':'Term',
                    'component':'TermComponent',
                    'icon':'term.png'
                }
            ]
        },
        {
            'name':'Log Out',
            'component':'LogOutComponent',
            'icon':'logout.png'
        }
    ];
    const menu = new Menu('list_menus',menus_list);
});