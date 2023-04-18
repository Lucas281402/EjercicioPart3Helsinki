const Notification = ({message}) => {
    if (message === null) {
        return (
            <div></div>
        )
    }
    
    if (message.startsWith('Added')) {
        return (
            <div className="add">
                {message}
            </div>
        )
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification