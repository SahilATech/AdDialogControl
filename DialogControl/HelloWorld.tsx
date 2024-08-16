/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { ChoiceGroup, ContextualMenu, DefaultButton, Dialog, DialogFooter, DialogType, IChoiceGroupOption, PrimaryButton } from '@fluentui/react';

interface IOption extends IChoiceGroupOption {
  description?: string; // Optional description field
}

export interface IHelloWorldProps {
  presentKeyinField: string;
  titleText: string;
  descriptionText: string;
  options: IOption[];
  dialogType: number;
  hideOnOutsideClick: boolean;
  saveButtonLabel: string;
  cancelButtonLabel: string;
  isDailogKeepInBounds: boolean;
  isDailogDraggable: boolean;
  minWidth: string;
  maxWidth: string;
  topOffsetFixed: boolean;
  openDialogButtonLabel: string;  
  onChange: (newValue: string) => void;
  uniqueKey: string;
  ShowDialogButtonVisible: boolean;
}

interface IHelloWorldState {
  modelProps: {
    isBlocking: boolean;
    topOffsetFixed: boolean;
    styles: {
      main: {
        minWidth: string;
        maxWidth: string;
      };     
    };    
    dragOptions?: {
      moveMenuItemText: string;
      closeMenuItemText: string;
      menu: typeof ContextualMenu;
      keepInBounds: boolean;
    }; 
  };
  dialogContentProps: {
    type: DialogType;
    title: string;
    subText: string;
  };
  isDialogHidden: boolean;
  optionSelected: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {

  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      modelProps: {
        isBlocking: !props.hideOnOutsideClick,
        topOffsetFixed: props.topOffsetFixed,
        styles: { 
          main: { 
            minWidth: `${props.minWidth} !important`,  
            maxWidth: `${props.maxWidth} !important`
          } 
        },
        dragOptions: props.isDailogDraggable ? {
          moveMenuItemText: "Move",
          closeMenuItemText: "Close",
          menu: ContextualMenu,
          keepInBounds: props.isDailogKeepInBounds,
        } : undefined
      },
      dialogContentProps: {
        type: props.dialogType,
        title: props.titleText,
        subText: props.descriptionText,
      }, 
      isDialogHidden: true,
      optionSelected: props.presentKeyinField,
    };

    // Attach methods and state to the global window object
    (window as any)[`pcfDialogControl_${props.uniqueKey}`] = {      
      state: this.state,
      toggleDialog: this.toggleDialog,  
      presentKeyinDatabase: props.presentKeyinField,
      currentSelectedOption: props.presentKeyinField,
      DismissFunctionOverride: this.handleDismissEvent,
      saveFunctionOverride: this.handleSaveEvent,
      cancelFunctionOverride: this.handleCancelEvent
    };
  }

  private toggleDialog = () => {
    this.setState((prevState) => ({ isDialogHidden: !prevState.isDialogHidden }));
  }

  private handleDismissEvent = () => {
    this.setState((prevState) => ({ isDialogHidden: !prevState.isDialogHidden }));
  }

  private handleCancelEvent = () => {
    this.setState((prevState) => ({ isDialogHidden: !prevState.isDialogHidden }));
  }

  private handleSaveEvent = () => {
    this.setState((prevState) => ({ isDialogHidden: !prevState.isDialogHidden }));
    this.props.onChange(this.state.optionSelected);
  }

  private handleSaveButton = () => {
    (window as any)[`pcfDialogControl_${this.props.uniqueKey}`].saveFunctionOverride();
  };

  private handleDismissButton = () => {
    (window as any)[`pcfDialogControl_${this.props.uniqueKey}`].DismissFunctionOverride();
  };

  private handleCancelButton = () => {
    (window as any)[`pcfDialogControl_${this.props.uniqueKey}`].cancelFunctionOverride();
  };

  private onChangeRenderDescription = (ev?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: IOption) => {
    if (option) {
      (window as any)[`pcfDialogControl_${this.props.uniqueKey}`].currentSelectedOption = option.key as string;
      this.setState({ optionSelected: option.key as string });
    }
  };

  private renderShowButton() {
    if (this.props.ShowDialogButtonVisible) {
      return <DefaultButton secondaryText={this.props.openDialogButtonLabel} onClick={this.toggleDialog} text={this.props.openDialogButtonLabel} />;
    }
    return null;
  }

  public render(): React.ReactNode {
    const { isDialogHidden, dialogContentProps, modelProps, optionSelected } = this.state;
    return (
      <>
        <div>
          {this.renderShowButton()}
        </div>
        <Dialog
          hidden={isDialogHidden}
          onDismiss={this.handleDismissButton}
          dialogContentProps={dialogContentProps}
          modalProps={modelProps}
        >
          <ChoiceGroup 
            defaultSelectedKey={this.props.presentKeyinField} 
            options={this.props.options} 
            onChange={this.onChangeRenderDescription} 
          />
          <div>
            <h1>Description</h1>
            <div>
              {this.props.options.find(option => option.key === optionSelected)?.description || 'No description available'}
            </div>
          </div>
          <DialogFooter>
            <PrimaryButton onClick={this.handleSaveButton} text={this.props.saveButtonLabel} />
            <DefaultButton onClick={this.handleCancelButton} text={this.props.cancelButtonLabel} />
          </DialogFooter>
        </Dialog>
      </>
    );
  }
}
