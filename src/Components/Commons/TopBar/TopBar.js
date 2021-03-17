import React from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { PageHeader } from 'antd';
import './TopBar.css'

export default function TopBar(props) {
    return (
        <div className="bar">
        <div className="topBar">
            <PageHeader
                ghost={true}
                title={`Tareas IA-2`}
                subTitle={"David Mariscal - 213548579"}
                extra={[
                    <InfoOutlinedIcon className="info-icon"
                            onClick={() => props.openModal()}/>
                ]}
            >
            </PageHeader>
        </div>
        
        </div>
    )
}
