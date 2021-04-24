import styled from "styled-components";
import {media, theme} from "../theme";
import {renderIcon} from "./render";

const StyledChip = styled.p`
  color: ${({theme, accent}: { theme: any; accent: boolean }) =>
          accent ? theme.colors.brand[400] : theme.colors.brand[800]};
  font-size: ${({theme}) => theme.fontSizes.lg};
  ${media.lg`font-size: ${theme.fontSizes.xl}`};
  font-weight: 600;

`;

type ChipProps = {
    icon: any;
    label: string;
    accent?: boolean;
};

const Chip = ({icon, label, accent = false}: ChipProps) => {
    return (
        <StyledChip accent={accent} className="mr-5">
            {renderIcon(icon)}
            <span className="ml-2">{label}</span>
        </StyledChip>
    );
};

export default Chip;
