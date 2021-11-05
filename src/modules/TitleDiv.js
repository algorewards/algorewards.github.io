export function TitleDiv(props) {
    return (
        <header className="App-center App-section">
            <div className="App-subheader-text">
                { props.titleText }
            </div>
        </header>
    )
}