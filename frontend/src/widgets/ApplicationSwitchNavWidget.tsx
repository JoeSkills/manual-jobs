import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const applicationSwitchNavLinks = [
  {
    label: 'Application Form',
    path: '/application-form-submit',
  },
  {
    label: 'Preview Application',
    path: '/user-profile-preview',
  },
];

const ApplicationSwitchNavWidget = () => {
  const { pathname } = useLocation();

  const modifyStylesOnCurrentPath = ({
    currentPath,
    navPath,
    initialCSSPropVal,
    modCSSPropVal,
    verifyPathEqualityOnly,
  }: {
    currentPath: string;
    navPath: string;
    initialCSSPropVal?: string | number;
    modCSSPropVal?: string | number;
    verifyPathEqualityOnly?: boolean;
  }) => {
    if (verifyPathEqualityOnly && currentPath === navPath) return true;

    if (currentPath === navPath) return modCSSPropVal;
    return initialCSSPropVal;
  };

  return (
    <Box
      p={2}
      fontSize={'14px'}
      color={'#fff '}
      fontWeight={'500'}
      bgcolor={'#2C3539'}
      display={'flex'}
      gap={'1.25rem'}
      justifyContent={'center'}
      flexDirection={{ xs: 'column', sm: 'row' }}
      textAlign={'center'}
    >
      {applicationSwitchNavLinks.map(({ path, label }) => (
        <Link
          key={label}
          to={path}
          style={{
            color: modifyStylesOnCurrentPath({
              currentPath: pathname,
              navPath: path,
              verifyPathEqualityOnly: true,
            })
              ? '#d4c31b'
              : '#fff',
            textTransform: modifyStylesOnCurrentPath({
              currentPath: pathname,
              navPath: path,
              verifyPathEqualityOnly: true,
            })
              ? 'uppercase'
              : 'initial',
            fontWeight: modifyStylesOnCurrentPath({
              currentPath: pathname,
              navPath: path,
              initialCSSPropVal: 500,
              modCSSPropVal: 700,
            }) as number,
          }}
        >
          {label}
        </Link>
      ))}
    </Box>
  );
};

export default ApplicationSwitchNavWidget;
