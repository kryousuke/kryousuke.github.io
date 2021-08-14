export function Page(props) {
    return (
        <div className="contents" onClick={props.onClick} style={props.style}>
            {props.children}
        </div>
    )
}