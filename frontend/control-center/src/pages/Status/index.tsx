import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps, useSelector} from 'react-redux';
import {getClientConfig, getConnectorsConfiguration, listComponents} from '../../actions';
import {StateModel} from '../../reducers';
import {ComponentListItem} from './ComponentListItem';
import {ReactComponent as RefreshIcon} from 'assets/images/icons/refreshIcon.svg';
import {setPageTitle} from '../../services/pageTitle';
import {useTranslation} from 'react-i18next';
import {ComponentRepository} from 'model';
import styles from './index.module.scss';

const mapDispatchToProps = {
  getClientConfig,
  getConnectorsConfiguration,
  listComponents,
};

const connector = connect(null, mapDispatchToProps);

const Status = (props: ConnectedProps<typeof connector>) => {
  const {getClientConfig, getConnectorsConfiguration, listComponents} = props;
  const components = useSelector((state: StateModel) => Object.entries(state.data.config.components));
  const catalogList = useSelector((state: StateModel) => state.data.catalog);
  const [spinAnim, setSpinAnim] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleString());
  const {t} = useTranslation();

  useEffect(() => {
    setPageTitle('Status');
    getClientConfig()
      .then(() => {
        setLastRefresh(new Date().toLocaleString());
      })
      .catch((error: Error) => {
        console.error(error);
      });
    getConnectorsConfiguration().catch((error: Error) => {
      console.error(error);
    });
    listComponents().catch((error: Error) => {
      console.error(error);
    });
  }, []);

  const handleRefresh = () => {
    props
      .getClientConfig()
      .then(() => {
        setLastRefresh(new Date().toLocaleString());
      })
      .catch((error: Error) => {
        console.error(error);
      });
    setSpinAnim(!spinAnim);
  };

  const formatToComponentName = (name: string) => {
    let formattedName;
    if (name.includes('enterprise')) {
      formattedName = `${ComponentRepository.airyEnterprise}/${name}`;
    } else {
      formattedName = `${ComponentRepository.airyCore}/${name}`;
    }

    return formattedName;
  };

  return (
    <section className={styles.statusWrapper}>
      <div className={styles.statusLastRefreshContainer}>
        <h1>{t('status')}</h1>
        <span>
          Last Refresh: <br />
          {lastRefresh}
        </span>
      </div>
      <div className={styles.listHeader}>
        <h2>{t('componentName')}</h2>
        <h2>{t('healthStatus')}</h2>

        <h2>{t('enabled')}</h2>
        <button onClick={handleRefresh} className={styles.refreshButton}>
          <div className={spinAnim ? styles.spinAnimationIn : styles.spinAnimationOut}>
            <RefreshIcon />
          </div>
        </button>
      </div>
      <div className={styles.listItems}>
        {Object.entries(catalogList).length > 0 &&
          components.map((component, index) => {
            const formattedName = formatToComponentName(component[0]);
            const catalogItem = catalogList[formattedName];
            return (
              <ComponentListItem
                key={index}
                healthy={component[1].healthy}
                enabled={component[1].enabled}
                services={component[1].services}
                componentName={component[0]}
                source={catalogItem?.source}
              />
            );
          })}
      </div>
    </section>
  );
};

export default connector(Status);
