# PCF-AdvanceDialogControl

**PCF-AdvanceDialogControl** is a versatile dialog component designed for use with PowerApps Component Framework (PCF). This control provides a highly customizable dialog experience, allowing developers to integrate dynamic choice options and configure various dialog settings to meet their application needs.

## Features

- **Dynamic Choice Options**: Easily display a list of options with customizable icons and descriptions.
- **Configurable Dialog Settings**: Control the appearance and behavior of the dialog, including size, visibility, and interactivity.
- **Custom Button Labels**: Define custom labels for the dialog’s open, save, and cancel buttons.
- **Interactive Behavior**: Includes options for managing dialog visibility, drag behavior, and screen boundaries.

## Key Properties

- **Field**: Bound property for synchronizing field values with the control.
- **Title**: Text displayed as the dialog's title.
- **Description**: Text displayed as the dialog's description.
- **Options**: An array of options with optional icons and descriptions for user selection.
- **Dialog Type**: Defines the style of the dialog (e.g., Normal, Large Header).
- **Hide On Outside Click**: Determines if the dialog should close when clicking outside of it.
- **Dialog Keep In Screen**: Ensures the dialog remains within the screen boundaries.
- **Dialog Draggable**: Enables dragging of the dialog window.
- **Minimum Width**: Sets the minimum width of the dialog.
- **Maximum Width**: Sets the maximum width of the dialog.
- **Top Offset Fixed**: Keeps the dialog's top offset fixed while showing the selected choice description.
- **Open Dialog Button Label**: Label for the button used to open the dialog.
- **Save Button Label**: Label for the save button within the dialog.
- **Cancel Button Label**: Label for the cancel button within the dialog.
- **Show Dialog Button Visible**: Controls the visibility of the button that triggers the dialog.
![MultiselectPcf](https://github.com/SahilATech/AdDialogControl/blob/83fa44a06186841f468b9fd5c1c982240d5be3ea/Images/DialogProperties_1.png)
![MultiselectPcf](https://github.com/SahilATech/AdDialogControl/blob/83fa44a06186841f468b9fd5c1c982240d5be3ea/Images/DialogProperties_2.png)

## Customization

- **Function Overrides**: Customize the behavior of the dialog by overriding the default save, cancel, and dismiss functions. The control exposes these functions through the global `pcfDialogControl_{logicalNameofField}` object, allowing you to modify their behavior as needed:
  - **saveFunctionOverride**: Override the default save functionality.
  - **cancelFunctionOverride**: Override the default cancel functionality.
  - **DismissFunctionOverride**: Override the default dismiss functionality.

- **global Object - pcfDialogControl_{logicalNameofField} (in screenshot sa_name)**

![OverrideFunction](https://github.com/SahilATech/AdDialogControl/blob/3fcf6c9fcd6ea91719610c441e0257273ea12249/Images/OverrideFunction.png)

**Override save function**

![OverrideFunctionExample](https://github.com/SahilATech/AdDialogControl/blob/3fcf6c9fcd6ea91719610c441e0257273ea12249/Images/OverrideFunctionExample.png)

You can also utilize the global `pcfDialogControl_{logicalNameofField}` object for additional functionality:
  - **Show Dialog**: You can programmatically open the dialog using JavaScript without requiring a button click.
  - **Get Current and Previous Choices**: Access the current selected choice and the previous choice stored in CDS (Common Data Service) using the global object.

## Usage

PCF-AdvanceDialogControl is ideal for applications requiring a customizable dialog component where users need to select from a range of options. The control allows for extensive customization, including the ability to modify button labels, manage dialog behavior, and handle various interaction scenarios.

**Dialog Open Button**
![Dialog Open Button](https://github.com/SahilATech/AdDialogControl/blob/83fa44a06186841f468b9fd5c1c982240d5be3ea/Images/DialogOpenButton.png)
 
 **Dialog Box**

 
![Dialog Box](https://github.com/SahilATech/AdDialogControl/blob/83fa44a06186841f468b9fd5c1c982240d5be3ea/Images/DialogBox.png)

**Dialog Box Without Title**


![Dialog Box Without Title](https://github.com/SahilATech/AdDialogControl/blob/83fa44a06186841f468b9fd5c1c982240d5be3ea/Images/DialogBoxWithoutTitle.png)

**Option Description**


![Option Description](https://github.com/SahilATech/AdDialogControl/blob/83fa44a06186841f468b9fd5c1c982240d5be3ea/Images/DialogOptionDescription.png)

**Dialog Options Without Icons**


![Dialog Options Without Icons](https://github.com/SahilATech/AdDialogControl/blob/83fa44a06186841f468b9fd5c1c982240d5be3ea/Images/DialogOptionWithoutIcon.png)

For available icons, see the [Fluent UI Icon Gallery](https://developer.microsoft.com/en-us/fluentui#/styles/web/icons).

[Managed Solution](https://github.com/SahilATech/AdDialogControl/raw/fccf1ec2388c2e80b35981cba172c25c795a2455/solutions_managed.zip
)
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust the sections and content as needed to fit your project's specifics and documentation style.
