import { ModelsInterface } from "./ModelsInterface";

export interface BaseModalInterface {
  prototype?: object;
  associate?(models: ModelsInterface): void;
}
