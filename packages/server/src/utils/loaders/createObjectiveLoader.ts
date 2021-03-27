import DataLoader from "dataloader";
import { Objective } from "../../entities/Objective";

export const createObjectiveLoader = () =>
  new DataLoader<number, Objective>(async (ids) => {
    const objectives = await Objective.find({
      where: { dailyObjectiveId: ids as number[] },
    });
    const idDataMapper: Record<number, Objective> = {};
    objectives.forEach((o) => {
      idDataMapper[o.id] = o;
    });
    return ids.map((id) => idDataMapper[id]);
  });
