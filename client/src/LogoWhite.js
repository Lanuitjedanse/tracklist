export default function LogoWhite({ togglePlaylist }) {
    return (
        <img
            className="logo-header"
            src="/vinyl-white.svg"
            alt="vinyl logo"
            onClick={togglePlaylist}
        />
    );
}
