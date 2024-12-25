import './Dashboard.css'
import duckIcon from '../assets/Duck.svg'

function Dashboard() {
    let scrapbooks = [
        { title: 'London', pages: '12', img: '' },
        { title: 'Sydney', pages: '10', img: '' },
        { title: 'Rome', pages: '7', img: '' },
        { title: 'Berlin', pages: '6', img: '' },
        { title: 'Dubai', pages: '3', img: '' },
        { title: 'Barcelona', pages: '9', img: '' },
        {title: 'New York is the best of the best of the best of the best of all time', pages: '900', img: ''}
    ]

    return (
        <div>
            <div id='nav'>
                <button>Create</button>
                <div id='title'>
                    <h1>Srapbokk</h1>
                    <img src={duckIcon} alt="Duck Icon" />
                </div>
                <button>Logout</button>
            </div>
            <div id='scrapbooks'>
                {scrapbooks.map((scrapbook, index) => (
                    <div class='scrapbook'>
                        <div class='thumbnail'>
                            {scrapbook.img &&
                                <img src={scrapbook.img} alt='scrapbook-thumbnail'/>
                            }
                        </div>
                        <h3>{scrapbook.title}</h3>
                        <h4>{scrapbook.pages} pages</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;