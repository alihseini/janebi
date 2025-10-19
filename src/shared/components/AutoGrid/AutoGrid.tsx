
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  minWidth?: number;
  type?: "fit" | "fill" | "stretch";
  rowGap?: number;
  columnGap?: number;
}

const AutoGrid: React.FC<IProps> = ({
  children,
  minWidth = 150,
  type = "fill",
  rowGap = 1,
  columnGap = 1,
  ...props
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-${type}, minmax(${minWidth}px, 1fr))`,
        gap: `${rowGap}rem ${columnGap}rem`,
        ...props?.style,
      }}
      {...props}>
      {children}
    </div>
  );
};

export default AutoGrid;
