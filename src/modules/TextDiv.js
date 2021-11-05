export function TextDiv(props) {
    return (
        <div className="App-section App-justify">
            <div className="App-section-text">
                { props.children }
            </div>
        </div>
    )
}