import copyImg from "../../assets/images/copy.svg";
import { RoomCodeStyled } from "./style";

type RoomCodeProps = {
  code: string | undefined;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    if (!code) return;
    navigator.clipboard.writeText(code);
  }
  return (
    <RoomCodeStyled onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy Room Code" />
      </div>
      <span>Sala #{code}</span>
    </RoomCodeStyled>
  );
}
