import { fetchCell } from "../../../utils/actions";

const CellList = async () => {
  const cells = await fetchCell();
  console.log(cells);
  return (
    <div>
      {cells.map((item, index) => {
        return <li key={index}>{item.title}</li>;
      })}
    </div>
  );
};
export default CellList;
