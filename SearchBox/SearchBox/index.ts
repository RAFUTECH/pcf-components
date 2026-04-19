import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { SearchBoxComponent } from "./components/SearchBoxComponent";

export class SearchBox implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private root: Root;
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private textValue: string = "";

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    _state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    this.root = createRoot(this.container);
    this.renderComponent(context);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.renderComponent(context);
  }

  public getOutputs(): IOutputs {
    return {
      textValue: this.textValue,
    };
  }

  public destroy(): void {
    this.root.unmount();
  }

  private renderComponent(context: ComponentFramework.Context<IInputs>): void {
    const hintText = context.parameters.hintText.raw ?? "";
    const jsonSettings = context.parameters.jsonSettings.raw ?? "";

    this.root.render(
      React.createElement(SearchBoxComponent, {
        hintText,
        jsonSettings,
        onChange: (value: string) => {
          this.textValue = value;
          this.notifyOutputChanged();
        },
      })
    );
  }
}
