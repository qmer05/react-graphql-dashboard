import '../index.css'

interface Props {
    channels: string[]
    onChannelChange: (channnel: string) => void;
}

function CampaignFilter({ channels, onChannelChange }: Props) {

    const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChannelChange(e.target.value)
    }

    return (
        <div>
            <label htmlFor="channel">Filtrér kanal: </label>
            <select id="channel" onChange={handleChannelChange}>
                <option value="">Alle</option>
                {channels.map((channel) =>
                (
                    <option key={channel} value={channel}>
                        {channel}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CampaignFilter;