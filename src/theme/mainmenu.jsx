import React from 'react';
import MaterialUICollapseMenu from '../component/mainMenu'

const items = [
    {
        "id": 1,
        "title": "",
        "items": [
            {
                "id": "dashboard",
                "icon": "dashboard",
                "name": "Dashboard",
                "link": "/dashboard"
            }
        ]
    },
    {
        "id": 2,
        "title": "",
        "items": [
            {
                "id": "user-module",
                "icon": "group",
                "name": "User Module",
                "subitems": [
                    {
                        "id": "users",
                        "icon": "person",
                        "name": "User List",
                        "link": "/users"
                    },
                ]
            }
        ]
    },
    {
        "id": 3,
        "title": "",
        "items": [
            {
                "id": "task-module",
                "icon": "recent_actors",
                "name": "Task Module",
                "subitems": [
                    {
                        "id": "tasks",
                        "icon": "recent_actors",
                        "name": "Task List",
                        "link": "/tasks"
                    },
                ]
            }
        ]
    }
]

class MainMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <MaterialUICollapseMenu items={items} />
            </React.Fragment>
        )

    }
}

export default MainMenu;