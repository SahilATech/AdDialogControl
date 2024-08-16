import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class DialogControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    private _presentKeyinField: string;
    private _titleText: string;
    private _descriptionText: string;
    private _options: string;
    private _dialogType: number;
    private _hideOnOutsideClick: boolean;
    private _isDialogKeepInBounds: boolean;
    private _isDialogDraggable: boolean;
    private _cancelButtonLabel: string;
    private _saveButtonLabel: string;
    private _minWidth: string;
    private _maxWidth: string;
    private _isShowDialogButtonVisible: boolean;
    private _isTopOffsetFixed: boolean;
    private _openDialogButtonLabel: string;
    private _latestValue: string;
    private _context: ComponentFramework.Context<IInputs>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _parseJson: any[];

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Initializes the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here; use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a control's lifecycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._context = context;

        this._presentKeyinField = context.parameters.InputOutputValue.raw ?? "";
        this._titleText = context.parameters.titleText.raw!;
        this._descriptionText = context.parameters.descriptionText.raw!;
        this._options = context.parameters.options.raw!;
        this._dialogType = Number(context.parameters.dialogType.raw);
        this._hideOnOutsideClick = context.parameters.hideOnOutsideClick.raw;
        this._saveButtonLabel = context.parameters.saveBtnLabel.raw!;
        this._cancelButtonLabel = context.parameters.cancelBtnLabel.raw!;
        this._isDialogKeepInBounds = context.parameters.isDailogKeepInBounds.raw;
        this._isDialogDraggable = context.parameters.isDailogDraggable.raw;
        this._minWidth = context.parameters.minWidth.raw!;
        this._maxWidth = context.parameters.maxWidth.raw!;
        this._isTopOffsetFixed = context.parameters.isTopOffsetFixed.raw;
        this._openDialogButtonLabel = context.parameters.openDialogButtonLabel.raw!;
        this._isShowDialogButtonVisible = context.parameters.isShowDialogButtonVisible.raw;

        try {
            this._parseJson = JSON.parse(this._options);
        } catch (error) {
            throw new Error("The provided options array is invalid. Please ensure it follows the correct format. Here is an example of a valid options array (All parameters are optional except key):\n" +
                '[\n' +
                '  { "key": "A", "iconProps": { "iconName": "CalendarDay" }, "text": "Option A", "disabled": false, "description": "Lorem ipsum dolor sit amet" },\n' +
                '  { "key": "B", "iconProps": { "iconName": "Calendar" }, "text": "Option B", "disabled": true, "description": "Consectetur adipiscing elit" },\n' +
                '  { "key": "C", "iconProps": { "iconName": "Add" }, "text": "Option C", "disabled": false, "description": "Sed do eiusmod tempor incididunt" }\n' +
                ']'
            );
        }
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values set up by the customizer mapped to names defined in the manifest, as well as utility functions.
     * @returns ReactElement root React element for the control.
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IHelloWorldProps = { 
            presentKeyinField: this._presentKeyinField,
            titleText: this._titleText,
            descriptionText: this._descriptionText,
            options: this._parseJson,
            dialogType: this._dialogType,
            hideOnOutsideClick: this._hideOnOutsideClick,
            saveButtonLabel: this._saveButtonLabel,
            cancelButtonLabel: this._cancelButtonLabel,
            isDailogDraggable: this._isDialogDraggable,
            isDailogKeepInBounds: this._isDialogKeepInBounds,
            minWidth: this._minWidth,
            maxWidth: this._maxWidth,
            topOffsetFixed: this._isTopOffsetFixed,
            openDialogButtonLabel: this._openDialogButtonLabel,
            onChange: this.onChange,
            uniqueKey: this._context.parameters.InputOutputValue.attributes?.LogicalName ?? "",
            ShowDialogButtonVisible: this._isShowDialogButtonVisible
        };

        return React.createElement(HelloWorld, props);
    }

    private onChange = (newValue: string) => {
        this._latestValue = newValue;
        this.notifyOutputChanged();
    };

    /**
     * Called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in the manifest, expecting object[s] for property marked as "bound" or "output".
     */
    public getOutputs(): IOutputs {
        return {
            InputOutputValue: this._latestValue
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup, i.e., cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to clean up control if necessary
    }
}
