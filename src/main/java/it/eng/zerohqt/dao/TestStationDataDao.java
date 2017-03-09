package it.eng.zerohqt.dao;

import it.eng.zerohqt.dao.model.ContextAttribute;
import it.eng.zerohqt.dao.model.TestStationData;
import it.eng.zerohqt.dao.mapper.TestStationDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ascatox on 13/02/17.
 */
@Repository
public class TestStationDataDao {

    @Autowired
    private TestStationDataMapper testStationDataMapper;


    public List<TestStationData> findAllNotificationsForStationBayByAck(String service, String contextName) {
        return testStationDataMapper.findAllAcknowledges(service, contextName,  ContextAttribute.acknowledge.name());
    }

    public List<TestStationData> findAllNotificationsForStationBayByStatesAndAck(String service, String contextName, List<String> states) {
        return testStationDataMapper.finAllNotificationsByStates(service, contextName, ContextAttribute.state.name(),
                ContextAttribute.statePayload.name(), ContextAttribute.acknowledge.name(), states);
    }
}