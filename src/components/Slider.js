export const Slider = ({ interval, setGameOptions }) => (
    <div>
        <div className="label">Interval:</div>
        <div className="slider-container">

            <input
                className="slider"
                type="range"
                min={1}
                max={100}
                value={interval}
                onChange={(e) => {
                    setGameOptions(prev => ({ ...prev, interval: e.target.value }))
                }}
            />
        </div>
    </div>
)