import './Scrapbook.css';
import HomeIcon from "@mui/icons-material/Home";
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import BackupIcon from '@mui/icons-material/Backup';
import ShareIcon from '@mui/icons-material/Share';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useState } from 'react';

function Scrapbook() {
    const [isExpanded, setIsExpanded] = useState(false);

    const iconStyle = {
        fontSize: '40px',
        color: '#F4EED8'
    };

    const toggleBar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div id='bar' className={isExpanded ? 'expanded' : ''}>
            <div onClick={toggleBar}>
                {isExpanded ? <WestIcon style={iconStyle} /> : <EastIcon style={iconStyle} />}
            </div>
            <HomeIcon style={iconStyle} />
            <ShapeLineIcon style={iconStyle} />
            <BackupIcon style={iconStyle} />
            <ShareIcon style={iconStyle} />
            <GetAppIcon style={iconStyle} />
        </div>
    );
}

export default Scrapbook;
