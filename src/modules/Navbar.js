export function Navbar(props) {
    return (
        <header className="App-header">
            <div className="App-header-text">
                { props.headerText }
            </div>
        </header>
    )
}