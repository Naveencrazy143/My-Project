import { translate } from '@I18n';
import React from 'react';

type NoRecordsFoundProps = {
  text?: string
}

const NoRecordsFound = ({text = translate("common.noRecordFound")!}: NoRecordsFoundProps) => (
  <div className="text-muted text-center" ><small>{text}</small></div>
)

export {NoRecordsFound};