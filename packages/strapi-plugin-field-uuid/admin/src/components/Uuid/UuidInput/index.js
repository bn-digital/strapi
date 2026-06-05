import { Box } from "@strapi/design-system/Box"
import { Field, FieldAction, FieldError, FieldHint, FieldInput, FieldLabel } from "@strapi/design-system/Field"
import { Flex } from "@strapi/design-system/Flex"
import { Stack } from "@strapi/design-system/Stack"
import Refresh from "@strapi/icons/Refresh"
import React, { useEffect, useRef, useState } from "react"
import { useIntl } from "react-intl"
import styled from "styled-components"
import { v4 } from "uuid"
import getTrad from "../../../utils/getTrad"

export const FieldActionWrapper = styled(FieldAction)`
  svg {
    height: 1rem;
    width: 1rem;

    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`
const UuidGenerateButton = ({ onClick, label }) => (
  <FieldActionWrapper onClick={onClick} label={label}>
    <Refresh />
  </FieldActionWrapper>
)
/**
 * @type {React.FC<HTMLInputElement>}
 * @return {JSX.Element}
 * @constructor
 */
const UuidInput = ({
  description,
  placeholder,
  disabled = true,
  intlLabel,
  error,
  labelAction,
  name,
  required = true,
  value: initialValue,
  onChange,
}) => {
  const { formatMessage } = useIntl()
  const [value, setValue] = useState(initialValue ?? v4())
  const ref = useRef(null)
  useEffect(() => {
    if (value && ref?.current && initialValue !== value) {
      ref.current.value = value
      onChange({ target: ref.current })
    }
  }, [value])


  return (
    <Box>
      <Field id={name} name={name} hint={description && formatMessage(description)} error={error}>
        <Flex direction='column' alignItems='stretch' gap={1}>
          <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
          <FieldInput
            ref={ref}
            defaultValue={initialValue}
            placeholder={placeholder}
            disabled={disabled}
            requried={required}
            onChange={onChange}
            value={value}
            endAction={
              !disabled ? (
                <UuidGenerateButton
                  onClick={() => setValue(v4())}
                  label={formatMessage({
                    id: getTrad("form.field.generate"),
                    defaultMessage: "Generate",
                  })}
                />
              ) : null
            }
          />
          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    </Box>
  )
}

export default UuidInput
