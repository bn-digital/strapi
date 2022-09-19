import { Box } from '@strapi/design-system/Box'
import { Field, FieldAction, FieldError, FieldHint, FieldInput, FieldLabel } from '@strapi/design-system/Field'
import { Flex } from '@strapi/design-system/Flex'
import { Stack } from '@strapi/design-system/Stack'
import Refresh from '@strapi/icons/Refresh'
import React, { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { v4 } from 'uuid'

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

const UUID_REGEX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i

/**
 *
 * @param description
 * @param {string} placeholder
 * @param {boolean} disabled
 * @param error
 * @param intlLabel
 * @param labelAction
 * @param {string} name
 * @param onChange
 * @param {boolean} required
 * @param {string} value
 * @return {JSX.Element}
 * @constructor
 */
const UuidInput = ({ description, placeholder, disabled, error, intlLabel, labelAction, name, onChange, required, value }) => {
  const { formatMessage } = useIntl()
  const [generated, setGenerated] = useState(value ?? v4())
  const ref = useRef(null)
  useEffect(() => {
    if (generated && ref.current && value !== generated) {
      ref.current.value = generated
      onChange({ target: ref.current })
    }
  }, [generated])
  return (
    <Box>
      <Field
        id={name}
        name={name}
        hint={description && formatMessage(description)}
        error={
          error ?? !value?.match(UUID_REGEX)
            ? formatMessage({
                id: 'field-uuid.form.field.error',
                defaultMessage: 'The UUID format is invalid.',
              })
            : null
        }
      >
        <Stack spacing={1}>
          <Flex>
            <FieldLabel>{formatMessage(intlLabel)}</FieldLabel>
          </Flex>
          <FieldInput
            ref={ref}
            labelAction={labelAction}
            placeholder={placeholder}
            disabled={disabled}
            requried={required}
            value={value?.toLowerCase()}
            onChange={onChange}
            endAction={
              <FieldActionWrapper
                onClick={() => !disabled && setGenerated(v4())}
                label={formatMessage({
                  id: 'field-uuid.form.field.generate',
                  defaultMessage: 'Generate',
                })}
              >
                <Refresh />
              </FieldActionWrapper>
            }
          />
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
    </Box>
  )
}

export default UuidInput
