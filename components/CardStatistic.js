const CardStatistic = (props) => {
    return (
        <>
            <div className="card row-column gap-3">
                <div className="row space-between">
                    <h3>{props.statisticName}</h3>
                    <i className={"card-stc-icon fa-solid " + props.solidIcon}></i>
                </div>
                <h1 className="card-stc-content">{props.data}</h1>
                <p className="card-stc-footer">{props.dataFooter}</p>
            </div>
        </>
    )
}

export default CardStatistic;