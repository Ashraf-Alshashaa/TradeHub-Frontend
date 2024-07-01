export interface RadioButtonProps {
    bidder_name : string;
    group_name : string;
    bid : number | string;
    onClick: () => void;
    checked?: boolean;
  }
