import * as React from "react";
import { GuiComponentContext } from "../ControlPanel/GuiComponentContext";
import { ViserInputComponent } from "./common";
import { GuiDropdownMessage } from "../WebsocketMessages";
import { Group, Select, SelectProps, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const iconProps = {
  stroke: 1.5,
  color: "currentColor",
  opacity: 0.6,
  size: 16,
};

const renderSelectOption: SelectProps["renderOption"] = ({ option, checked }) => (
  <Group flex="1" gap="0.375em" style={{ overflow: "hidden" }}>
    <Text fz="xs" truncate="end" flex="1" title={option.label}>
      {option.label}
    </Text>
    {checked && <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />}
  </Group>
);

export default function DropdownComponent({
  uuid,
  value,
  props: { hint, label, disabled, visible, options },
}: GuiDropdownMessage) {
  const { setValue } = React.useContext(GuiComponentContext)!;
  if (!visible) return null;
  return (
    <ViserInputComponent {...{ uuid, hint, label }}>
      <Select
        id={uuid}
        radius="xs"
        value={value}
        data={options}
        onChange={(value) => value !== null && setValue(uuid, value)}
        disabled={disabled}
        searchable
        maxDropdownHeight={400}
        size="xs"
        rightSectionWidth="1.2em"
        styles={{
          input: {
            padding: "0.5em",
            letterSpacing: "-0.5px",
            minHeight: "1.625rem",
            height: "1.625rem",
          },
          options: {
            minWidth: "100% !important",
          },
        }}
        // zIndex of dropdown should be >modal zIndex.
        // On edge cases: it seems like existing dropdowns are always closed when a new modal is opened.
        comboboxProps={{ zIndex: 1000 }}
        renderOption={renderSelectOption}
      />
    </ViserInputComponent>
  );
}
