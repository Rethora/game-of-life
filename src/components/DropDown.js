export const DropDown = ({ setGameOptions }) => {
    const handleChange = (e) => {
        setGameOptions(prev => ({ ...prev, pattern: e.target.value }));
    }
    return (
        <div>
            <div className="label">Choose a pattern:</div>
            <select name="patterns" id="patterns" onChange={handleChange}>
                <option
                    value="random"
                >
                    Random
                </option>
                <option
                    value="maxDensityStillLife"
                >
                    Max Density Still Life
                </option>
                <option
                    value="pulsar"
                >
                    Pulsar
                </option>
                <option
                    value="firstGenPulsar"
                >
                    First Gen Pulsar
                </option>
                <option
                    value="gliderGun"
                >
                    Glider Gun
                </option>
                <option
                    value="crazyCorners"
                >
                    Crazy Corners
                </option>
                <option
                    value="pentadecathlon"
                >
                    Pentadecathlon
                </option>
            </select>
        </div>
    )
}